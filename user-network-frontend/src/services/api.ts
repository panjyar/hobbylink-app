import { User } from '../types';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export class ApiService {
  static async fetchUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${API_BASE}/users`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users. Please ensure the backend server is running on port 4000.');
    }
  }

  static async createUser(user: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create user');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async updateUser(id: string, user: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update user');
      }
      return response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  static async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE}/users/${id}`, { 
        method: 'DELETE' 
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete user');
      }
      return response.json();
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  static async linkUsers(userId: string, friendId: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE}/users/${userId}/link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to link users');
      }
      return response.json();
    } catch (error) {
      console.error('Error linking users:', error);
      throw error;
    }
  }

  static async unlinkUsers(userId: string, friendId: string): Promise<{ message: string }> {
    try {
      const response = await fetch(`${API_BASE}/users/${userId}/unlink`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ friendId })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to unlink users');
      }
      return response.json();
    } catch (error) {
      console.error('Error unlinking users:', error);
      throw error;
    }
  }
}