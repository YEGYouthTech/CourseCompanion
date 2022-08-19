/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';
import User from '@/models/User';

import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';

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

  const dbUser = (await User.where('uid').equals(user.user_id))[0] || null;
  if (!dbUser) {
    return res.status(400).json({ error: 'You are not a registered user' });
  }

  const {
    body: { name, profileImage },
  } = req;
  if (!name) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const group = await Group.create({
      name,
      profileImage,
      owner: user.user_id,
    });
    // Add the owner to the group
    await group.addUser(user.user_id);
    await dbUser.update({ $push: { groups: group.id } });
    return res.status(201).json(group);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
