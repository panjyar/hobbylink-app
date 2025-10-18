import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { AppState, Action, AppContextType, User, HistoryItem } from '../types';
import { ApiService } from '../services/api';

const initialState: AppState = {
  users: [],
  allHobbies: [],
  selectedUser: null,
  loading: false,
  error: null,
  history: [],
  historyIndex: -1
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_HOBBIES':
      return { ...state, allHobbies: action.payload };
    case 'SELECT_USER':
      return { ...state, selectedUser: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'ADD_HISTORY':
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      return {
        ...state,
        history: [...newHistory, action.payload],
        historyIndex: state.historyIndex + 1
      };
    case 'UNDO':
      return { ...state, historyIndex: Math.max(-1, state.historyIndex - 1) };
    case 'REDO':
      return { ...state, historyIndex: Math.min(state.history.length - 1, state.historyIndex + 1) };
    default:
      return state;
  }
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchUsers = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const users = await ApiService.fetchUsers();
      dispatch({ type: 'SET_USERS', payload: users });
      
      const hobbies = new Set<string>();
      users.forEach((u: User) => u.hobbies.forEach(h => hobbies.add(h)));
      dispatch({ type: 'SET_HOBBIES', payload: Array.from(hobbies) });
    } catch (err) {
      console.error('Fetch users error:', err);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch users. Please check if the backend server is running on port 4000.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const createUser = async (user: Partial<User>) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await ApiService.createUser(user);
      await fetchUsers();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to create user';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw err;
    }
  };

  const updateUser = async (id: string, user: Partial<User>) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await ApiService.updateUser(id, user);
      await fetchUsers();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to update user';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw err;
    }
  };

  const deleteUser = async (id: string) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await ApiService.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to delete user';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw err;
    }
  };

  const linkUsers = async (userId: string, friendId: string) => {
    if (userId === friendId) {
      dispatch({ type: 'SET_ERROR', payload: 'Cannot link user to themselves' });
      return;
    }
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await ApiService.linkUsers(userId, friendId);
      dispatch({ type: 'ADD_HISTORY', payload: { type: 'connect', data: { userId, friendId } } });
      await fetchUsers();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to link users';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw err;
    }
  };

  const unlinkUsers = async (userId: string, friendId: string) => {
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      await ApiService.unlinkUsers(userId, friendId);
      dispatch({ type: 'ADD_HISTORY', payload: { type: 'disconnect', data: { userId, friendId } } });
      await fetchUsers();
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to unlink users';
      dispatch({ type: 'SET_ERROR', payload: errorMsg });
      throw err;
    }
  };

  const addHobby = async (userId: string, hobby: string) => {
    const user = state.users.find(u => u.id === userId);
    if (user && !user.hobbies.includes(hobby)) {
      await updateUser(userId, { hobbies: [...user.hobbies, hobby] });
    }
  };

  return (
    <AppContext.Provider value={{ 
      state, 
      dispatch, 
      fetchUsers, 
      createUser, 
      updateUser, 
      deleteUser, 
      linkUsers, 
      unlinkUsers, 
      addHobby 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}