/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'GET' && method !== 'POST' && method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  const user = await verifyToken(req.headers.authorization);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (method === 'GET') {
    const {
      query: { q: name },
    } = req;
    const group = await Group.findOne(
      { where: { name } },
      {
        name: 1,
        owner: 1,
        members: 1,
      }
    );
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    return res.status(200).json(group);
  }
  if (method === 'POST') {
    const {
      body: { group: groupId, action },
    } = req;
    if (action !== 'add' && action !== 'remove') {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const dbUser = (await User.where('uid').equals(user.user_id))[0] || null;
    if (!dbUser) {
      return res.status(400).json({ error: 'You are not a registered user' });
    }
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (action === 'add') {
      if (group.members.includes(user.user_id)) {
        return res.status(400).json({ error: 'User is already in the group' });
      }
      if (!dbUser.pendingInvites.includes(groupId)) {
        return res.status(400).json({
          error: `User is not invited to this group`,
        });
      }
      await group.addUser(user.user_id);
      await User.updateOne(
        { uid: user.user_id },
        { $pull: { pendingInvites: groupId }, $push: { groups: groupId } }
      );
    } else if (action === 'remove') {
      // You must not be the owner of the group to remove yourself
      if (group.owner === user.user_id) {
        return res.status(400).json({ error: 'Delete the group instead' });
      }
      if (!group.members.includes(user.user_id)) {
        return res.status(400).json({ error: 'User is not in the group' });
      }
      await group.removeUser(user.user_id);
      await User.updateOne(
        { uid: user.user_id },
        { $pull: { groups: groupId } }
      );
    }
    return res.status(200).json(group);
  }
  if (method === 'DELETE') {
    const {
      query: { name },
    } = req;
    const group = (await Group.where('name').equals(name))[0] || null;
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    if (group.owner !== user.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await group.remove();
    await User.updateMany(
      {},
      { $pull: { groups: name, pendingInvites: name } }
    );
    return res.status(200).json({ message: 'Group deleted' });
  }
};
