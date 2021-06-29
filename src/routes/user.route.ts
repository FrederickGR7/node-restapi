import { Router } from 'express';
import { createUser, deleteUser, getUser, getUsers, logging, updateUser } from '../controllers/user.controller'
const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.post('/logging', logging);
router.put('/users', updateUser);
router.delete('/users/:id', deleteUser);


export default router;