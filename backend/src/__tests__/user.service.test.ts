import { UserService } from '../services/user.service';
import { User } from '../models/User.model';
import mongoose from 'mongoose';

// Mock mongoose
jest.mock('mongoose');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('calculatePopularityScore', () => {
    it('should calculate popularity score correctly', async () => {
      const mockUser = {
        friends: ['friend1', 'friend2'],
        hobbies: ['reading', 'gaming']
      } as any;

      const mockFriend1 = { hobbies: ['reading', 'music'] };
      const mockFriend2 = { hobbies: ['gaming', 'sports'] };

      (User.findOne as jest.Mock)
        .mockResolvedValueOnce(mockFriend1)
        .mockResolvedValueOnce(mockFriend2);

      const score = await UserService.calculatePopularityScore(mockUser);
      
      // 2 friends + (2 shared hobbies * 0.5) = 2 + 1 = 3
      expect(score).toBe(3);
    });
  });

  describe('getAllUsers', () => {
    it('should return all users with popularity scores', async () => {
      const mockUsers = [
        { id: '1', username: 'user1', age: 25, hobbies: ['reading'], friends: [], createdAt: new Date() },
        { id: '2', username: 'user2', age: 30, hobbies: ['gaming'], friends: [], createdAt: new Date() }
      ];

      (User.find as jest.Mock).mockResolvedValue(mockUsers);
      (UserService.calculatePopularityScore as jest.Mock)
        .mockResolvedValueOnce(1.5)
        .mockResolvedValueOnce(2.0);

      const result = await UserService.getAllUsers();

      expect(result).toHaveLength(2);
      expect(result[0]).toHaveProperty('popularityScore', 1.5);
      expect(result[1]).toHaveProperty('popularityScore', 2.0);
    });
  });
});
