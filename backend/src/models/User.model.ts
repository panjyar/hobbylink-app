import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUserDocument extends Document {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
  friends: string[];
  createdAt: Date;
  popularityScore: number;
}

const UserSchema = new Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
    required: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 1
  },
  hobbies: {
    type: [String],
    required: true,
    default: []
  },
  friends: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
UserSchema.virtual('popularityScore').get(async function(this: IUserDocument) {
  const numFriends = this.friends.length;
  
  // Calculate shared hobbies
  let sharedHobbies = 0;
  const User = mongoose.model<IUserDocument>('User');
  
  for (const friendId of this.friends) {
    const friend = await User.findOne({ id: friendId });
    if (friend) {
      const commonHobbies = this.hobbies.filter(h => friend.hobbies.includes(h));
      sharedHobbies += commonHobbies.length;
    }
  }
  
  return numFriends + (sharedHobbies * 0.5);
});

UserSchema.set('toJSON', { virtuals: true });
UserSchema.set('toObject', { virtuals: true });

export const User = mongoose.model<IUserDocument>('User', UserSchema);