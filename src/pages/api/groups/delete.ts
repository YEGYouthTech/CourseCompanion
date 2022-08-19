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
    body: { group: id },
  } = req;
  if (!id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    if (group.members.length > 1) {
      return res.status(400).json({
        error: 'Group has members. Kick them before deleting the group.',
      });
    }
    // Users may not remove other users' groups
    if (group.owner !== user.user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await group.remove();
    await dbUser.update({ $pull: { groups: id } });
    return res.status(200).json({ message: 'Group deleted' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
