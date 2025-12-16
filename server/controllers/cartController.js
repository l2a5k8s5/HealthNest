import Cart from "../models/cart.js";
import Product from "../models/product.js";
export const getCart=async(req,res)=>{
    try {
        let cart = await Cart.findOne({ user: req.user.id })
          .populate('items.product', 'name price images stock discountPrice');
    
        if (!cart) {
          cart = await Cart.create({
            user: req.user.id,
            items: []
          });
        }
    
        res.status(200).json({
          success: true,
          cart
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    

}

export const addToCart=async(req,res)=>{
    try {
        const { productId, quantity, weight } = req.body;
    
        // Check if product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        }
    
        if (product.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: 'Insufficient stock'
          });
        }
    
        let cart = await Cart.findOne({ user: req.user.id });
    
        if (!cart) {
          cart = new Cart({
            user: req.user.id,
            items: []
          });
        }
    
        // Check if product already in cart
        const existingItemIndex = cart.items.findIndex(
          item => item.product.toString() === productId
        );
    
        const price = product.discountPrice > 0 ? product.discountPrice : product.price;
    
        if (existingItemIndex > -1) {
          // Update quantity
          cart.items[existingItemIndex].quantity += quantity;
          cart.items[existingItemIndex].price = price;
        } else {
          // Add new item
          cart.items.push({
            product: productId,
            quantity,
            price,
            weight: weight || `${product.weight.value}${product.weight.unit}`
          });
        }
    
        await cart.save();
        await cart.populate('items.product', 'name price images stock discountPrice');
    
        res.status(200).json({
          success: true,
          message: 'Item added to cart',
          cart
        });
    }catch(error)
    {
        res.status(500).json({
            success: false,
            message: error.message
          });
    }
}

export const updateCartItem=async(req,res)=>{
    try {
        const { quantity } = req.body;
        const { itemId } = req.params;
    
        if (quantity < 1) {
          return res.status(400).json({
            success: false,
            message: 'Quantity must be at least 1'
          });
        }
    
        const cart = await Cart.findOne({ user: req.user.id });
    
        if (!cart) {
          return res.status(404).json({
            success: false,
            message: 'Cart not found'
          });
        }
    
        const item = cart.items.id(itemId);
        if (!item) {
          return res.status(404).json({
            success: false,
            message: 'Item not found in cart'
          });
        }
    
        // Check stock
        const product = await Product.findById(item.product);
        if (product.stock < quantity) {
          return res.status(400).json({
            success: false,
            message: 'Insufficient stock'
          });
        }
    
        item.quantity = quantity;
        await cart.save();
        await cart.populate('items.product', 'name price images stock discountPrice');
    
        res.status(200).json({
          success: true,
          message: 'Cart updated',
          cart
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    };


    
// @desc    Remove item from cart
// @route   DELETE /api/cart/remove/:itemId
// @access  Private
export const removeFromCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
  
      cart.items = cart.items.filter(
        item => item._id.toString() !== req.params.itemId
      );
  
      await cart.save();
      await cart.populate('items.product', 'name price images stock discountPrice');
  
      res.status(200).json({
        success: true,
        message: 'Item removed from cart',
        cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
  // @desc    Clear cart
  // @route   DELETE /api/cart/clear
  // @access  Private
  export const clearCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id });
  
      if (!cart) {
        return res.status(404).json({
          success: false,
          message: 'Cart not found'
        });
      }
  
      cart.items = [];
      await cart.save();
  
      res.status(200).json({
        success: true,
        message: 'Cart cleared',
        cart
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };

