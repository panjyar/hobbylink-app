// user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();

// Remove the /users prefix here
router.get('/', UserController.getAllUsers);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);
router.post('/:id/link', UserController.linkUsers);
router.delete('/:id/unlink', UserController.unlinkUsers);
router.get('/graph', UserController.getGraphData);

export default router;
