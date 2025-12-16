import Order from './../models/order.js';
import Product from './../models/product.js';
import Cart from '../models/cart.js';


export const createOrder=async(req,res)=>{
    try{
        const{
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        }=req.body;

        if(!orderItems || orderItems.length === 0) {
            return res.status(0).json({
                success:false,
                message:"No Order Items found"
            });
        }

            // Verify stock availability

            for(let item of orderItems) {
                const product=await Product.findById(item.product);
                if(!product){
                    return res.status(404).json({
                        success:false,
                        message :`Insufficient stock for ${item.name}`
                    });
                }
                if(product.stock<item.quantity){
                    return res.status(400).json({
                        success:false,
                        message: `Insufficient stock for ${item.name}`
                    });
                }
            }


            const order=await Order.create({
                user:req.user.id,
                orderItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice,
                isPaid : paymentMethod === 'COD' ? false :false // Will be updated after payment
            });

                // Update product stock and sold count
                for(let item of orderItems) {
                    await Product.findByIdAndUpdate(item.product,{
                        $inc:{
                            stock : -item.quantity,
                            soldCount: item.quantity,
                        }
                    });
                }

                // Clear user's cart
                await Cart.findOneAndDelete({ user: req.user.id });

                

    }catch(error)
    {
        res.status(201).json({
            success : false,
            message : error.message
        });
    }
}


// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private


export const getOrderById=async(req,res)=>{
    try{
        const order=await Order.findById(req.params.id)
        .populate('user','name email phone')
        .populate("orderItems.product","name images");


        if(!Order){
            return res.status(404).json({
                success: false,
                message : "Order Not Found"
            });
        }
        res.status(200).json({
            success: true,
            order
          });

        
    }catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('orderItems.product', 'name images');

    const total = await Order.countDocuments({ user: req.user.id });

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    let query = {};

    // Filter by status
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }

    // Filter by payment status
    if (req.query.isPaid) {
      query.isPaid = req.query.isPaid === 'true';
    }

    // Date range filter
    if (req.query.startDate || req.query.endDate) {
      query.createdAt = {};
      if (req.query.startDate) query.createdAt.$gte = new Date(req.query.startDate);
      if (req.query.endDate) query.createdAt.$lte = new Date(req.query.endDate);
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('user', 'name email phone');

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, trackingNumber, courierService, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.orderStatus = orderStatus || order.orderStatus;
    
    if (trackingNumber) order.trackingNumber = trackingNumber;
    if (courierService) order.courierService = courierService;

    // Update delivery status
    if (orderStatus === 'Delivered') {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Can only cancel if not shipped
    if (order.orderStatus === 'Shipped' || order.orderStatus === 'Delivered') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel shipped or delivered orders'
      });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    // Restore stock
    for (let item of order.orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: {
          stock: item.quantity,
          soldCount: -item.quantity
        }
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentInfo = {
      id: req.body.id,
      status: req.body.status,
      razorpay_order_id: req.body.razorpay_order_id,
      razorpay_payment_id: req.body.razorpay_payment_id,
      razorpay_signature: req.body.razorpay_signature
    };

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment successful',
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
