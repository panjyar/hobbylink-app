import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

interface UserFormProps {
  editingId: string | null;
  onClose: () => void;
}

export function UserForm({ editingId, onClose }: UserFormProps) {
  const { state, createUser, updateUser } = useApp();
  const [formData, setFormData] = useState({ 
    username: '', 
    age: '', 
    hobbies: '' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingId) {
      const user = state.users.find(u => u.id === editingId);
      if (user) {
        setFormData({
          username: user.username,
          age: user.age.toString(),
          hobbies: user.hobbies.join(', ')
        });
      }
    } else {
      setFormData({ username: '', age: '', hobbies: '' });
    }
  }, [editingId, state.users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const userData = {
        username: formData.username.trim(),
        age: parseInt(formData.age),
        hobbies: formData.hobbies
          .split(',')
          .map(h => h.trim())
          .filter(Boolean)
      };

      // Validation
      if (!userData.username) {
        setError('Username is required');
        return;
      }
      if (!userData.age || userData.age < 1) {
        setError('Valid age is required');
        return;
      }
      if (userData.hobbies.length === 0) {
        setError('At least one hobby is required');
        return;
      }

      if (editingId) {
        await updateUser(editingId, userData);
      } else {
        await createUser(userData);
      }

      setFormData({ username: '', age: '', hobbies: '' });
      onClose();
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save user');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 card">
      {error && (
        <div className="text-error text-xs mb-4 p-3 bg-error rounded">
          {error}
        </div>
      )}
      
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
        className="input"
        disabled={isSubmitting}
      />
      
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
        min="1"
        max="120"
        className="input"
        disabled={isSubmitting}
        style={{ marginTop: '0.5rem' }}
      />
      
      <input
        type="text"
        placeholder="Hobbies (comma-separated)"
        value={formData.hobbies}
        onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
        required
        className="input"
        disabled={isSubmitting}
        style={{ marginTop: '0.5rem' }}
      />
      
      <div className="row gap-2" style={{ marginTop: '0.75rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
        </button>
        <button 
          type="button" 
          onClick={onClose}
          className="btn btn-muted"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}