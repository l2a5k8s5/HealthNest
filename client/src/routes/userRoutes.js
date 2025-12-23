import React from "react";
import Cart from "../Pages/Cart";
import Checkout from "../Pages/CheckOut";
import Orders from './../Pages/Orders';
import OrderDetails from "../Pages/OrdersDetails";
import Profile from "../Pages/Profile";
import PrivateRoute from "./PrivateRoute";



export const userRoutes=[
    {
        path:'/cart',
        element:(
            <PrivateRoute>
                <Cart/>
            </PrivateRoute>
        ),
    },
    {
        path:'/checkout',
        element: (
            <PrivateRoute>
                 <Checkout/> 
            </PrivateRoute>
        )
    },
    {
        path:'/orders',
        element: (
            <PrivateRoute>
                 <Orders/> 
            </PrivateRoute>
        )
    },
    {
        path:'/orders/:id',
        element: (
            <PrivateRoute>
                 <OrderDetails/> 
            </PrivateRoute>
        )
    },
    {
        path:'/profile',
        element: (
            <PrivateRoute>
                 <Profile/> 
            </PrivateRoute>
        ),
    },

];
