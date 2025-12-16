import express from 'express'
import { getProducts,getProduct,createProduct,updateProduct,deleteProduct,getCategories,updateStock } from './../controllers/productController.js';
import {protect,authorize} from "../middlewares/auth.js"
const router=express.Router();


router.get('/',getProducts);
router.get("/categories/all",getCategories)
router.get('/:id', getProduct);


//nAdmin routes

router.post('/createProduct', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.patch('/:id/stock', protect, authorize('admin'), updateStock);
export default router;
