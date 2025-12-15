import Order from './../models/order';
import product from './../models/product';
import Cart from '../models/cart';


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
                const product=await product.findById(item.product);
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
                    await product.findByIdAndUpdate(item.product,{
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
