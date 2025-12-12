import jwt from "jsonwebtoken";
import User from '../models/user.js';

export const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split('   ')[1];
    }

    if(!token){
        return res.status(401).json({
            success:false,
            message: "No token, authorization denied",

        });
    }

    try{
        // verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        // get user from token 
        req.User =await User.findById(decoded.id).select('-password');


        if(!req.User){
            return res.status(401).json({
            success: false,
            message:"User Not found"
            });
        }

        if(!req.User.isActive){
            return res.status(401).json({
                success:false,
                message:"Account is Deactivated",
            });
        }
        next();
    }catch(error){
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
              success: false,
              message: "Token has expired. Please login again.",
            });
          }
        return res.status(401).json({
            success:false,
            message: 'Not authorized to access this route'
        });
    };

};


export const authorize=async(req,res,next)=>{
    return (req,res,next)=>{
        if(!roles.include(req.user.role)){
            return res.status(403).json({
                success:false,
                message:`User role  ${req.User.role} is not authorized to access this route`
            });
        }
        next();
    };
};


export const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE || '7d'
    });

};



