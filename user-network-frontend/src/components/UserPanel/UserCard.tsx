import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  const { deleteUser } = useApp();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
      setIsDeleting(true);
      try {
        await deleteUser(id);
      } catch (err) {
        console.error('Delete error:', err);
        alert(err instanceof Error ? err.message : 'Failed to delete user');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="card" style={{ opacity: isDeleting ? 0.5 : 1 }}>
      <div className="row items-center justify-between mb-4">
        <div>
          <div className="card-title">{user.username}</div>
          <div className="text-xs text-muted">Age: {user.age}</div>
        </div>
        <div className="row gap-2">
          <button 
            onClick={() => onEdit(user)} 
            className="btn-icon"
            disabled={isDeleting}
            title="Edit user"
          >
            <Edit2 className="icon-7" />
          </button>
          <button 
            onClick={() => handleDelete(user.id)} 
            className="btn-icon btn-danger"
            disabled={isDeleting}
            title="Delete user"
          >
            <Trash2 className="icon-7" />
          </button>
        </div>
      </div>
      
      <div className="text-xs text-muted mb-4">
        Friends: {user.friends?.length || 0}
      </div>
      
      <div className="text-xs text-indigo" style={{ fontWeight: 600 }}>
        Score: {(user.popularityScore || 0).toFixed(1)}
      </div>
      
      {user.hobbies && user.hobbies.length > 0 && (
        <div className="text-xs text-muted" style={{ marginTop: '0.5rem' }}>
          {user.hobbies.join(', ')}
        </div>
      )}
    </div>
  );
}