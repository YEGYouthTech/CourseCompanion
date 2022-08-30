/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (
    method !== 'GET' &&
    method !== 'POST' &&
    method !== 'DELETE' &&
    method !== 'PUT'
  ) {
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
      query: { q: name, id },
    } = req;
    if (!name && !id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    let group;
    if (name) {
      group = await Group.findOne(
        { where: { name } },
        {
          name: 1,
          owner: 1,
          members: 1,
        }
      );
    } else if (id) {
      group = await Group.findById(id, {
        name: 1,
        owner: 1,
        members: 1,
      });
    }
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    return res.status(200).json(group);
  }
  if (method === 'POST') {
    const {
      body: { group: groupId, user: userId, action },
    } = req;
    if (action !== 'add' && action !== 'remove') {
      return res.status(400).json({ error: 'Invalid action' });
    }

    const dbUser = (await User.where('uid').equals(userId))[0] || null;
    if (!dbUser) {
      return res.status(400).json({ error: 'Not a registered user' });
    }
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    if (action === 'add') {
      if (group.members.includes(userId)) {
        return res.status(400).json({ error: 'User is already in the group' });
      }
      console.log(group, group.public, group.public, !group.public);
      if (!group.public && !dbUser.pendingInvites.includes(groupId)) {
        return res.status(400).json({
          error: `User is not invited to this group`,
        });
      }
      // User may not add anyone but themselves to a group
      if (userId !== user.uid) {
        return res.status(403).json({ error: 'Not authorized' });
      }
      await group.addUser(userId);
      await User.updateOne(
        { uid: userId },
        { $pull: { pendingInvites: groupId }, $push: { groups: groupId } }
      );
    } else if (action === 'remove') {
      // if (!group.members.includes(userId)) {
      //   return res.status(400).json({ error: 'User is not in the group' });
      // }
      // You may not remove the group owner
      if (group.owner === userId) {
        return res.status(400).json({
          error:
            'The group owner may not leave the group. Delete the group instead.',
        });
      }
      // You may not remove others from a group unless you are the owner
      if (userId !== user.uid && group.owner !== user.uid) {
        return res.status(403).json({
          error:
            'You may not remove others from a group unless you are the owner.',
        });
      }
      await group.removeUser(userId);
      await User.updateOne(
        { uid: userId },
        { $pull: { groups: groupId, pendingInvites: groupId } }
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
  if (method === 'PUT') {
    const {
      body: { id, name, profileImage },
    } = req;
    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    if (group.owner !== user.uid) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await group.update({ name, profileImage });
    return res.status(200).json(group);
  }
};
