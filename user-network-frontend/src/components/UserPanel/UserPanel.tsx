import React, { useState, useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import { UserForm } from './UserForm';
import { UserCard } from './UserCard';
import { LoadingSpinner } from '../LoadingSpinner';

export function UserPanel() {
  const { state, fetchUsers } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="panel-left overflow-y-auto">
      <div className="row items-center justify-between mb-4">
        <h3 className="text-sm font-bold row gap-2">
          <Users className="icon-7" />
          Users
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          <Plus className="icon-7" />
        </button>
      </div>

      {showForm && (
        <UserForm 
          editingId={editingId} 
          onClose={handleFormClose}
        />
      )}

      {state.loading && <LoadingSpinner text="Loading users..." />}
      {state.error && (
        <div className="text-error text-sm mb-4 p-3 bg-error rounded">
          {state.error}
        </div>
      )}

      <div className="space-y-2">
        {state.users.map(user => (
          <UserCard 
            key={user.id} 
            user={user} 
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
}