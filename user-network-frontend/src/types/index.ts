export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  createdAt: string;
  popularityScore: number;
}

export interface HistoryItem {
  type: 'move' | 'connect' | 'disconnect';
  data: any;
}

export interface AppState {
  users: User[];
  allHobbies: string[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  history: HistoryItem[];
  historyIndex: number;
}

export type Action =
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'SET_HOBBIES'; payload: string[] }
  | { type: 'SELECT_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_HISTORY'; payload: HistoryItem }
  | { type: 'UNDO' }
  | { type: 'REDO' };

export interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  fetchUsers: () => Promise<void>;
  createUser: (user: Partial<User>) => Promise<void>;
  updateUser: (id: string, user: Partial<User>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  linkUsers: (userId: string, friendId: string) => Promise<void>;
  unlinkUsers: (userId: string, friendId: string) => Promise<void>;
  addHobby: (userId: string, hobby: string) => Promise<void>;
}