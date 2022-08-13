/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    body: { group: groupName, userId, isInvited },
  } = req;
  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    return res.status(400).json({ error: 'User not found' });
  }
  const group = await Group.findOne({ where: { name: groupName } });
  if (!group) {
    return res.status(404).json({ error: 'Group not found' });
  }
  if (!user.pendingInvites) {
    user.pendingInvites = [];
  }
  if (isInvited && !user.pendingInvites.includes(groupName)) {
    user.pendingInvites.push(groupName);
  } else if (!isInvited && user.pendingInvites.includes(groupName)) {
    user.pendingInvites = user.pendingInvites.pull(groupName);
  } else {
    return res.status(400).json({
      error: `User is already ${
        isInvited ? 'invited' : 'not invited'
      } to this group`,
    });
  }
  await user.save();
  return res.status(200).json({
    success: true,
    message: `Invite ${isInvited ? 'sent' : 'revoked'}`,
  });
};
