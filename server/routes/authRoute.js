import express from "express";
import { register,login,getMe,updateProfile,updatePassword,addAddress,deleteAddress , createAdmin , createFirstAdmin ,  promoteToAdmin} from './../controllers/authController.js';
import { protect  , authorize} from "../middlewares/auth.js";
const router = express.Router();

// Public routes
router.post('/register',register);
router.post('/login',login);


// ==========================================
// ADMIN CREATION ROUTES
// ==========================================

// Create admin with secret key (Always available)
router.post('/create-admin', createAdmin);

// Create FIRST admin without secret (Use once, then remove/comment out)
router.post('/create-first-admin', createFirstAdmin);


// protect routes 

router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/updatepassword', protect, updatePassword);
router.post('/address', protect, addAddress);
router.delete('/address/:addressId', protect, deleteAddress);


// ==========================================
// ADMIN ONLY ROUTES
// ==========================================
// Promote existing user to admin (Only admins can do this)
router.put('/promote-to-admin/:userId', protect, authorize('admin'), promoteToAdmin);

export default router;
