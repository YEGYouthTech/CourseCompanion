/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';
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

  const {
    body: { group: groupId, userId, isInvited },
  } = req;
  if (groupId == null || userId == null || isInvited == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const targetUser = (await User.where('uid').equals(userId))[0] || null;
  if (!targetUser) {
    return res.status(400).json({ error: 'User not found' });
  }
  let group;
  try {
    group = await Group.findById(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
  } catch (error) {
    return res.status(404).json({ error: 'Group not found' });
  }
  // You have to be in the group to invite someone
  if (!group.members.includes(user.user_id)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // You can't invite yourself
  if (user.id === userId) {
    return res.status(400).json({ error: "You can't invite yourself" });
  }
  // You can't invite someone who is already in the group
  if (group.members.includes(userId)) {
    return res.status(400).json({ error: 'User is already in the group' });
  }
  if (isInvited && !targetUser.pendingInvites.includes(groupId)) {
    await targetUser.update({
      $push: { pendingInvites: groupId },
    });
  } else if (!isInvited && targetUser.pendingInvites.includes(groupId)) {
    await targetUser.update({
      $pull: { pendingInvites: groupId },
    });
  } else {
    // You can't invite someone who is already invited
    return res.status(400).json({
      error: `User is already ${
        isInvited ? 'invited' : 'not invited'
      } to this group`,
    });
  }
  return res.status(200).json({
    success: true,
    message: `Invite ${isInvited ? 'sent' : 'revoked'}`,
  });
};
