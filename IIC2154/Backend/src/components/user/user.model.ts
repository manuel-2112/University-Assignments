import mongoose from 'mongoose';
import { IUser } from './user.interface';
import { Status } from './status.enum';
import { Role } from './role.enum';

/**
 * User Model, database representation
 */
const userSchema = new mongoose.Schema<IUser>(
  {
    user_id: { type: String, required: true, unique: true },
    favoriteCompanies: {
      type: [String],
      default: [],
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.NONE,
      required: true,
    },

    displayData: {
      name: { type: String },
      number: { type: String },
      email: { type: String },
      motivation: { type: String },
    },

    role: { type: String, enum: Role },

    claimedCompanies: {
      type: [String],
      default: [],
      required: true,
    },

    ownedCompanies: {
      type: [String],
      default: [],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model<IUser>('User', userSchema);
export default UserModel;
