import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 2,
    maxLength: 64,
  },
  grade: {
    type: Number,
    required: false,
    min: 10,
    max: 12,
  },
  profileImage: {
    type: String,
    required: false,
    trim: true,
    minLength: 2,
    maxLength: 256,
  },
  uid: {
    type: String,
    required: true,
    minLength: 28,
    maxLength: 28,
  },
  groups: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
      },
    ],
    required: true,
    default: () => [],
  },
  timetable: {
    type: [String],
    required: true,
    default: () => [],
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
  pendingInvites: {
    type: [String],
    required: true,
    default: () => [],
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
