import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    minLength: 28,
    maxLength: 28,
  },
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
  profileImage: {
    type: String,
    true: false,
    trim: true,
    minLength: 2,
    maxLength: 256,
  },
  grade: {
    type: Number,
    required: true,
    enum: [0, 10, 11, 12],
  },
  school: {
    type: String,
    required: false,
    trim: true,
    minLength: 0,
    maxLength: 64,
    enum: ['', 'Old Scona Academic', 'Lillian Osborne', 'Harry Ainlay'],
    default: '',
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
  pendingInvites: {
    type: [String],
    required: true,
    default: () => [],
  },
  timetable: {
    type: String,
    required: false,
    default: '',
    minLength: 0,
    maxLength: 8192,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
