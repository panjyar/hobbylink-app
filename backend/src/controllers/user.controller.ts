import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { username, age, hobbies } = req.body;

      if (!username || !age || !hobbies) {
        return res.status(400).json({ message: 'Username, age, and hobbies are required' });
      }

      if (typeof age !== 'number' || age < 1) {
        return res.status(400).json({ message: 'Age must be a positive number' });
      }

      if (!Array.isArray(hobbies)) {
        return res.status(400).json({ message: 'Hobbies must be an array' });
      }

      const user = await UserService.createUser({ username, age, hobbies });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const user = await UserService.updateUser(id, updates);
      res.json(user);
    } catch (error) {
      if ((error as Error).message === 'User not found') {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      res.json(result);
    } catch (error) {
      if ((error as Error).message === 'User not found') {
        return res.status(404).json({ message: 'User not found' });
      }
      if ((error as Error).message.includes('Cannot delete user')) {
        return res.status(409).json({ message: (error as Error).message });
      }
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async linkUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { friendId } = req.body;

      if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
      }

      const result = await UserService.linkUsers(id, friendId);
      res.json(result);
    } catch (error) {
      if ((error as Error).message.includes('not found')) {
        return res.status(404).json({ message: (error as Error).message });
      }
      if ((error as Error).message.includes('already friends') || (error as Error).message.includes('Cannot link')) {
        return res.status(409).json({ message: (error as Error).message });
      }
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async unlinkUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { friendId } = req.body;

      if (!friendId) {
        return res.status(400).json({ message: 'Friend ID is required' });
      }

      const result = await UserService.unlinkUsers(id, friendId);
      res.json(result);
    } catch (error) {
      if ((error as Error).message.includes('not found')) {
        return res.status(404).json({ message: (error as Error).message });
      }
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }

  static async getGraphData(req: Request, res: Response) {
    try {
      const graphData = await UserService.getGraphData();
      res.json(graphData);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
  }
}
