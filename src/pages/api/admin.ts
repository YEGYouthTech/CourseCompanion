/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';
import Group from '@/models/Group';
import User from '@/models/User';

import dbConnect from '../../lib/dbConnect';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  const user = await verifyToken(req.headers.authorization);

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const dbUser = (await User.where('uid').equals(user.user_id))[0] || null;
  if (!dbUser) {
    return res.status(400).json({ error: 'You are not a registered user' });
  }

  if (dbUser.uid !== 'JxNuB1W2EeSYlIGQjBFAShMk9QE3') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // export all collections
  const groups = await Group.find({});
  const users = await User.find({});
  return res.status(200).json({ groups, users });
};
