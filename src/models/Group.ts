import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 32,
    unique: true,
  },
  members: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    required: false,
    trim: true,
    minLength: 0,
    maxLength: 256,
  },
});

GroupSchema.methods.addUser = function (user: string) {
  this.members.push(user);
  return this.save();
};

GroupSchema.methods.removeUser = function (user: string) {
  this.members.pull(user);
  return this.save();
};

export default mongoose.models.Group || mongoose.model('Group', GroupSchema);
