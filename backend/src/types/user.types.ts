export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  createdAt: Date;
  popularityScore: number;
}

export interface CreateUserDTO {
  username: string;
  age: number;
  hobbies: string[];
}

export interface UpdateUserDTO {
  username?: string;
  age?: number;
  hobbies?: string[];
}

export interface LinkUserDTO {
  friendId: string;
}