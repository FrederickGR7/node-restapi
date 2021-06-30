import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, logging, updateUser } from '../controllers/user.controller'
import { verifyToken } from '../utils/token.handler';
import { isAdmin } from '../utils/role.handlers';

const router = Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUser);
router.post('/users', createUser);
router.get('/logging', logging);
router.put('/users', [verifyToken], updateUser);
router.delete('/users/:id', [verifyToken, isAdmin], deleteUser);


export default router;