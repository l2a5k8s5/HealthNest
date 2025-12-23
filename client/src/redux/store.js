import { configureStore } from "@reduxjs/toolkit";
import productReducer from './slices/productSlice' ;
import cartReducer from './slices/cartSlice';
import orderReducer from './slices/orderSlice'
import authReducer from "./slices/authSlice";
import adminReducer from "./slices/adminSlice"

const store = configureStore({
    reducer: {
      auth: authReducer,
      products: productReducer,
      cart: cartReducer,
      orders: orderReducer,
      admin: adminReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export default store;