import express from 'express';
import { createOrder , getOrderById , getMyOrders , getAllOrders,updateOrderStatus,cancelOrder , updateOrderToPaid } from './../controllers/orderController.js';
const router = express.Router();
import { protect,authorize } from '../middlewares/auth.js';

// User routes
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/cancel', protect, cancelOrder);
router.put('/:id/pay', protect, updateOrderToPaid);

// Admin routes
router.get('/', protect, authorize('admin'), getAllOrders);
router.put('/:id/status', protect, authorize('admin'), updateOrderStatus);

export default router;