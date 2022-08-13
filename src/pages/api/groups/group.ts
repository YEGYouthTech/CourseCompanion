/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method === 'GET') {
    const {
      query: { name },
    } = req;
    const group = await Group.findOne({ where: { name } });
    if (!group) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(group);
  }
  if (method === 'POST') {
    const {
      query: { name },
      body: { action, userId },
    } = req;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    if (action !== 'add' && action !== 'remove') {
      return res.status(400).json({ error: 'Invalid action' });
    }
    const group = await Group.findOne({ where: { name } });
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }
    if (action === 'add') {
      await group.addUser(userId);
    } else if (action === 'remove') {
      await group.removeUser(userId);
    }
    return res.status(200).json(group);
  }
  if (method === 'DELETE') {
    const {
      body: { name },
    } = req;
    const group = await Group.deleteOne({ where: { name } });
    if (!group.deletedCount) {
      return res.status(404).json({ error: 'Group not found' });
    }
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
