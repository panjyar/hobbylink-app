import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

router.get('/users', UserController.getAllUsers);
router.post('/users', UserController.createUser);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
router.post('/users/:id/link', UserController.linkUsers);
router.delete('/users/:id/unlink', UserController.unlinkUsers);
router.get('/graph', UserController.getGraphData);

export default router;