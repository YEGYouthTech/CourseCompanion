/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { q } = req.query;
  const users = await User.find()
    .where('name')
    .regex(new RegExp(q, 'i'))
    .select('uid name profileImage');
  return res.status(200).json(users);
};
