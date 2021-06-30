import { Router } from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.controller';
import { isAdmin } from '../utils/role.handlers';
import { verifyToken } from '../utils/token.handler';

const router = Router();

router.get('/products', verifyToken, getProducts);
router.get('/products/:id', verifyToken, getProduct);
router.post('/products', [verifyToken, isAdmin], createProduct);
router.put('/products', [verifyToken, isAdmin], updateProduct);
router.delete('/products/:id', [verifyToken, isAdmin], deleteProduct);

export default router;