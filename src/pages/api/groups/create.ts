/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../lib/dbConnect';
import Group from '../../../models/Group';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const {
    body: { owner, name },
  } = req;
  const user = await Group.create({ owner, name });
  return res.status(201).json(user);
};
