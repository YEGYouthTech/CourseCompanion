/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method === 'GET') {
    const {
      query: { id },
    } = req;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  }
  if (method === 'PUT') {
    const {
      body: { id, name, email },
    } = req;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.update({ name, email });
    return res.status(200).json(user);
  }
  if (method === 'DELETE') {
    const {
      body: { id },
    } = req;
    const user = await User.deleteOne({ where: { id } });
    if (!user.deletedCount) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(204).end();
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
