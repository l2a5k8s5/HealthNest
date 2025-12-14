import express from "express";
import { register,login,getMe,updateProfile,updatePassword,addAddress,deleteAddress } from './../controllers/authController.js';
import { protect } from "../middlewares/auth.js";
const router = express.Router();

// Public routes
router.post('/register',register);
router.post('/login',login);


// protect routes 

router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/updatepassword', protect, updatePassword);
router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, deleteAddress);

export default router;
