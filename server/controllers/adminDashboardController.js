import Order from "../models/order.js";
import Product from "../models/product.js";
import User from './../models/user.js';



export const getDashBoardSets=async(req,res)=>{
    try{
        const today=new Date();
        today.setHours(0,0,0,0);


        const thisMonth=new Date();
        thisMonth.setDate(1);
        thisMonth.setHours(0,0,0,0);

        const lastMonth=new Date(thisMonth);

        lastMonth.setMonth(lastMonth.getMonth()-1);


        // Total Revenue

        const revenueResult=await Order.aggregate([
            {$match  : {isPaid : true}},
            {$group : {_id : null , total : {$sum: 'totalPrice'}}}
        ]);
        const totalRevenue = revenueResult[0]?.total || 0;
         // Today's Revenue
         const todayRevenueResult = await Order.aggregate([
           { 
             $match: { 
               isPaid: true,
               createdAt: { $gte: today }
             } 
           },
           { $group: { _id: null, total: { $sum: '$totalPrice' } } }
         ]);
         const todayRevenue = todayRevenueResult[0]?.total || 0;
     
         // This Month's Revenue
         const monthRevenueResult = await Order.aggregate([
           { 
             $match: { 
               isPaid: true,
               createdAt: { $gte: thisMonth }
             } 
           },
           { $group: { _id: null, total: { $sum: '$totalPrice' } } }
         ]);
         const monthRevenue = monthRevenueResult[0]?.total || 0;
     
         // Last Month's Revenue
         const lastMonthRevenueResult = await Order.aggregate([
           { 
             $match: { 
               isPaid: true,
               createdAt: { $gte: lastMonth, $lt: thisMonth }
             } 
           },
           { $group: { _id: null, total: { $sum: '$totalPrice' } } }
         ]);
         const lastMonthRevenue = lastMonthRevenueResult[0]?.total || 0;
     
         // Total Orders
         const totalOrders = await Order.countDocuments();
         const todayOrders = await Order.countDocuments({ createdAt: { $gte: today } });
         const monthOrders = await Order.countDocuments({ createdAt: { $gte: thisMonth } });
     
         // Orders by Status
         const ordersByStatus = await Order.aggregate([
           { 
             $group: { 
               _id: '$orderStatus', 
               count: { $sum: 1 } 
             } 
           }
         ]);
     
         // Total Products
         const totalProducts = await Product.countDocuments({ isActive: true });
         const outOfStock = await Product.countDocuments({ stock: { $lte: 0 } });
         const lowStock = await Product.countDocuments({ stock: { $gt: 0, $lte: 10 } });
     
         // Total Users
         const totalUsers = await User.countDocuments({ role: 'user' });
         const newUsersToday = await User.countDocuments({ 
           role: 'user',
           createdAt: { $gte: today }
         });
         const newUsersThisMonth = await User.countDocuments({ 
           role: 'user',
           createdAt: { $gte: thisMonth }
         });
     
         // Top Selling Products
         const topProducts = await Order.aggregate([
           { $unwind: '$orderItems' },
           { 
             $group: { 
               _id: '$orderItems.product',
               name: { $first: '$orderItems.name' },
               totalSold: { $sum: '$orderItems.quantity' },
               revenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } }
             } 
           },
           { $sort: { totalSold: -1 } },
           { $limit: 10 }
         ]);
     
         // Revenue by Category
         const revenueByCategory = await Order.aggregate([
           { $unwind: '$orderItems' },
           { 
             $lookup: {
               from: 'products',
               localField: 'orderItems.product',
               foreignField: '_id',
               as: 'product'
             }
           },
           { $unwind: '$product' },
           {
             $group: {
               _id: '$product.category',
               revenue: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } },
               count: { $sum: '$orderItems.quantity' }
             }
           },
           { $sort: { revenue: -1 } }
         ]);
     
         // Sales Chart Data (Last 30 days)
         const thirtyDaysAgo = new Date();
         thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
     
         const salesChart = await Order.aggregate([
           { 
             $match: { 
               createdAt: { $gte: thirtyDaysAgo },
               isPaid: true
             } 
           },
           {
             $group: {
               _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
               orders: { $sum: 1 },
               revenue: { $sum: '$totalPrice' }
             }
           },
           { $sort: { _id: 1 } }
         ]);
     
         // Recent Orders
         const recentOrders = await Order.find()
           .sort({ createdAt: -1 })
           .limit(10)
           .populate('user', 'name email')
           .select('orderStatus totalPrice createdAt user');
     
         // Calculate growth percentages
         const revenueGrowth = lastMonthRevenue > 0 
           ? ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(2)
           : 0;
     
         res.status(200).json({
           success: true,
           stats: {
             revenue: {
               total: totalRevenue,
               today: todayRevenue,
               thisMonth: monthRevenue,
               lastMonth: lastMonthRevenue,
               growth: revenueGrowth
             },
             orders: {
               total: totalOrders,
               today: todayOrders,
               thisMonth: monthOrders,
               byStatus: ordersByStatus
             },
             products: {
               total: totalProducts,
               outOfStock,
               lowStock
             },
             users: {
               total: totalUsers,
               today: newUsersToday,
               thisMonth: newUsersThisMonth
             },
             topProducts,
             revenueByCategory,
             salesChart,
             recentOrders
           }
         });
       } catch (error) {
         res.status(500).json({
           success: false,
           message: error.message
         });
       }
     };
     
     // @desc    Get revenue analytics
     // @route   GET /api/admin/analytics/revenue
     // @access  Private/Admin
     exports.getRevenueAnalytics = async (req, res) => {
       try {
         const { startDate, endDate, groupBy } = req.query;
     
         let matchStage = { isPaid: true };
         
         if (startDate && endDate) {
           matchStage.createdAt = {
             $gte: new Date(startDate),
             $lte: new Date(endDate)
           };
         }
     
         let dateFormat;
         switch(groupBy) {
           case 'day':
             dateFormat = '%Y-%m-%d';
             break;
           case 'week':
             dateFormat = '%Y-W%U';
             break;
           case 'month':
             dateFormat = '%Y-%m';
             break;
           case 'year':
             dateFormat = '%Y';
             break;
           default:
             dateFormat = '%Y-%m-%d';
         }
     
         const analytics = await Order.aggregate([
           { $match: matchStage },
           {
             $group: {
               _id: { $dateToString: { format: dateFormat, date: '$createdAt' } },
               totalRevenue: { $sum: '$totalPrice' },
               totalOrders: { $sum: 1 },
               averageOrderValue: { $avg: '$totalPrice' }
             }
           },
           { $sort: { _id: 1 } }
         ]);
     
         res.status(200).json({
           success: true,
           analytics
         });
       } catch (error) {
         res.status(500).json({
           success: false,
           message: error.message
         });
       }
     };
     
     // @desc    Get product analytics
     // @route   GET /api/admin/analytics/products
     // @access  Private/Admin
     exports.getProductAnalytics = async (req, res) => {
       try {
         // Products by category
         const productsByCategory = await Product.aggregate([
           { $match: { isActive: true } },
           {
             $group: {
               _id: '$category',
               count: { $sum: 1 },
               totalStock: { $sum: '$stock' }
             }
           }
         ]);
     
         // Low stock products
         const lowStockProducts = await Product.find({ stock: { $lte: 10 } })
           .select('name category stock')
           .sort({ stock: 1 })
           .limit(20);
     
         // Most reviewed products
         const mostReviewed = await Product.find()
           .sort({ numReviews: -1 })
           .limit(10)
           .select('name rating numReviews');
     
         res.status(200).json({
           success: true,
           analytics: {
             productsByCategory,
             lowStockProducts,
             mostReviewed
           }
         });
       } catch (error) {
         res.status(500).json({
           success: false,
           message: error.message
         });
       }
     };
     
     // @desc    Get all users (Admin)
     // @route   GET /api/admin/users
     // @access  Private/Admin
     exports.getAllUsers = async (req, res) => {
       try {
         const page = parseInt(req.query.page) || 1;
         const limit = parseInt(req.query.limit) || 20;
         const skip = (page - 1) * limit;
     
         const users = await User.find({ role: 'user' })
           .select('-password')
           .sort({ createdAt: -1 })
           .limit(limit)
           .skip(skip);
     
         const total = await User.countDocuments({ role: 'user' });
     
         res.status(200).json({
           success: true,
           count: users.length,
           total,
           page,
           pages: Math.ceil(total / limit),
           users
         });
       } catch (error) {
         res.status(500).json({
           success: false,
           message: error.message
         });
       }
     };
     
     // @desc    Update user status (Admin)
     // @route   PUT /api/admin/users/:id/status
     // @access  Private/Admin
     exports.updateUserStatus = async (req, res) => {
       try {
         const { isActive } = req.body;
     
         const user = await User.findByIdAndUpdate(
           req.params.id,
           { isActive },
           { new: true }
         ).select('-password');
     
         if (!user) {
           return res.status(404).json({
             success: false,
             message: 'User not found'
           });
         }
     
         res.status(200).json({
           success: true,
           message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
           user
         });
    }catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
          });
    };

}
