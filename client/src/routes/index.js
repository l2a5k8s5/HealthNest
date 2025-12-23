import React from "react";
import {Route} from 'react-router-dom';
import Home from './../Pages/Home';
import Products from './../Pages/Products';
import Login from './../Pages/Login';
import Register from './../Pages/Register';


export const publicRoutes=[
    {
        path:"/",
        element:<Home />,
    },
    {
        path:"/proucts",
        element:
        <Products />,
    },
    {
        path:"/login",
        element:<Login />,
    },
    {
        path:"/register",
        element:<Register />,
    }
];