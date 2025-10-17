import { User, IUserDocument } from '../models/User.model';
import { CreateUserDTO, UpdateUserDTO } from '../types/user.types';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  // Calculate popularity score for a user
  static async calculatePopularityScore(user: IUserDocument): Promise<number> {
    const numFriends = user.friends.length;
    let sharedHobbies = 0;

    for (const friendId of user.friends) {
      const friend = await User.findOne({ id: friendId });
      if (friend) {
        const commonHobbies = user.hobbies.filter(h => friend.hobbies.includes(h));
        sharedHobbies += commonHobbies.length;
      }
    }

    return numFriends + (sharedHobbies * 0.5);
  }

  // Get all users with popularity scores
  static async getAllUsers() {
    const users = await User.find();
    const usersWithScores = await Promise.all(
      users.map(async (user) => {
        const score = await this.calculatePopularityScore(user);
        return {
          id: user.id,
          username: user.username,
          age: user.age,
          hobbies: user.hobbies,
          friends: user.friends,
          createdAt: user.createdAt,
          popularityScore: score
        };
      })
    );
    return usersWithScores;
  }

  // Create a new user
  static async createUser(data: CreateUserDTO) {
    const user = new User({
      id: uuidv4(),
      ...data,
      friends: [],
      createdAt: new Date()
    });
    await user.save();
    
    const score = await this.calculatePopularityScore(user);
    return {
      id: user.id,
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
      friends: user.friends,
      createdAt: user.createdAt,
      popularityScore: score
    };
  }

  // Update a user
  static async updateUser(id: string, data: UpdateUserDTO) {
    const user = await User.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }

    if (data.username) user.username = data.username;
    if (data.age) user.age = data.age;
    if (data.hobbies) user.hobbies = data.hobbies;

    await user.save();
    
    const score = await this.calculatePopularityScore(user);
    return {
      id: user.id,
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
      friends: user.friends,
      createdAt: user.createdAt,
      popularityScore: score
    };
  }

  // Delete a user
  static async deleteUser(id: string) {
    const user = await User.findOne({ id });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if user has friends
    if (user.friends.length > 0) {
      throw new Error('Cannot delete user with active friendships. Please unlink all friends first.');
    }

    // Check if other users have this user as a friend
    const friendedBy = await User.findOne({ friends: id });
    if (friendedBy) {
      throw new Error('Cannot delete user who is friends with others. Please unlink all friendships first.');
    }

    await User.deleteOne({ id });
    return { message: 'User deleted successfully' };
  }

  // Link two users (create friendship)
  static async linkUsers(userId: string, friendId: string) {
    if (userId === friendId) {
      throw new Error('Cannot link user to themselves');
    }

    const user = await User.findOne({ id: userId });
    const friend = await User.findOne({ id: friendId });

    if (!user || !friend) {
      throw new Error('User or friend not found');
    }

    // Check if already friends (prevent circular friendship)
    if (user.friends.includes(friendId)) {
      throw new Error('Users are already friends');
    }

    // Add mutual friendship
    user.friends.push(friendId);
    friend.friends.push(userId);

    await user.save();
    await friend.save();

    return { message: 'Users linked successfully' };
  }

  // Unlink two users (remove friendship)
  static async unlinkUsers(userId: string, friendId: string) {
    const user = await User.findOne({ id: userId });
    const friend = await User.findOne({ id: friendId });

    if (!user || !friend) {
      throw new Error('User or friend not found');
    }

    // Remove from both sides
    user.friends = user.friends.filter(fid => fid !== friendId);
    friend.friends = friend.friends.filter(fid => fid !== userId);

    await user.save();
    await friend.save();

    return { message: 'Users unlinked successfully' };
  }

  // Get graph data
  static async getGraphData() {
    const users = await this.getAllUsers();
    
    const nodes = users.map(user => ({
      id: user.id,
      username: user.username,
      age: user.age,
      popularityScore: user.popularityScore
    }));

    const edges: Array<{ source: string; target: string }> = [];
    const processed = new Set<string>();

    users.forEach(user => {
      user.friends.forEach(friendId => {
        const edgeId = [user.id, friendId].sort().join('-');
        if (!processed.has(edgeId)) {
          edges.push({ source: user.id, target: friendId });
          processed.add(edgeId);
        }
      });
    });

    return { nodes, edges };
  }
}
