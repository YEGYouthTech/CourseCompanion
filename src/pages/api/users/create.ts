/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  const user = await verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const targetUser = await User.create({
    uid: user.user_id,
    name: user.name,
    email: user.email,
    profileImage: user.picture,
    grade: 0,
    school: '',
    groups: [],
    pendingInvites: [],
    timetable: '',
    createdAt: new Date(),
  });
  return res.status(201).json(targetUser);
};
