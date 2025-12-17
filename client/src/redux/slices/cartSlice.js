import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

const initialState = {
  cartItems: cartItems,
  ...calculateTotals(cartItems),
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || null,
  paymentMethod: localStorage.getItem('paymentMethod') || null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Get cart from server
export const getCart = createAsyncThunk(
  'cart/get',
  async (_, thunkAPI) => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add to cart
export const addToCart = createAsyncThunk(
  'cart/add',
  async ({ productId, quantity = 1, weight }, thunkAPI) => {
    try {
      // First get product details
      const productRes = await api.get(`/products/${productId}`);
      const product = productRes.data.product;

      // Then add to cart on server
      const response = await api.post('/cart/add', {
        productId,
        quantity,
        weight: weight || `${product.weight.value}${product.weight.unit}`,
      });

      // Return cart item data
      return {
        product: product._id,
        name: product.name,
        image: product.images[0]?.url,
        price: product.discountPrice > 0 ? product.discountPrice : product.price,
        stock: product.stock,
        quantity,
        weight: weight || `${product.weight.value}${product.weight.unit}`,
      };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update cart item
export const updateCartItem = createAsyncThunk(
  'cart/update',
  async ({ itemId, productId, quantity }, thunkAPI) => {
    try {
      await api.put(`/cart/update/${itemId}`, { quantity });
      return { productId, quantity };
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from cart
export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async ({ itemId, productId }, thunkAPI) => {
    try {
      await api.delete(`/cart/remove/${itemId}`);
      return productId;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Clear cart
export const clearCart = createAsyncThunk(
  'cart/clear',
  async (_, thunkAPI) => {
    try {
      await api.delete('/cart/clear');
      return null;
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', action.payload);
    },
    // For offline use - add to cart without API call
    addToCartLocal: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x.product === existItem.product
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        );
      } else {
        state.cartItems.push(item);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
    // Update quantity locally
    updateCartItemLocal: (state, action) => {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        state.cartItems = state.cartItems.filter((item) => item.product !== productId);
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.product === productId ? { ...item, quantity } : item
        );
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
    // Remove from cart locally
    removeFromCartLocal: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      const totals = calculateTotals(state.cartItems);
      state.totalItems = totals.totalItems;
      state.totalAmount = totals.totalAmount;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get cart
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const items = action.payload.cart?.items || [];
        state.cartItems = items;
        localStorage.setItem('cartItems', JSON.stringify(items));
        const totals = calculateTotals(items);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product === item.product);

        if (existItem) {
          state.cartItems = state.cartItems.map((x) =>
            x.product === existItem.product
              ? { ...x, quantity: x.quantity + item.quantity }
              : x
          );
        } else {
          state.cartItems.push(item);
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        const totals = calculateTotals(state.cartItems);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
        state.message = 'Item added to cart';
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update cart item
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        const { productId, quantity } = action.payload;
        
        if (quantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.product !== productId);
        } else {
          state.cartItems = state.cartItems.map((item) =>
            item.product === productId ? { ...item, quantity } : item
          );
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        const totals = calculateTotals(state.cartItems);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
        state.message = 'Cart updated';
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Remove from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        );

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        const totals = calculateTotals(state.cartItems);
        state.totalItems = totals.totalItems;
        state.totalAmount = totals.totalAmount;
        state.message = 'Item removed from cart';
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Clear cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cartItems = [];
        state.totalItems = 0;
        state.totalAmount = 0;
        localStorage.removeItem('cartItems');
        state.message = 'Cart cleared';
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { 
  reset, 
  saveShippingAddress, 
  savePaymentMethod,
  addToCartLocal,
  updateCartItemLocal,
  removeFromCartLocal
} = cartSlice.actions;

export default cartSlice.reducer;