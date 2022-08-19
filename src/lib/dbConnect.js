/* eslint-disable global-require */
import mongoose from 'mongoose';

const connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

  require('../models/Group.ts');
  require('../models/User.ts');

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState;
  console.log('MongoDB is connected:', connection.isConnected);
}
