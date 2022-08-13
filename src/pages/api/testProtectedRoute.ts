/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

export default async (req, res) => {
  const { method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing authorization header' });
  }
  const user = await verifyToken(req.headers.authorization);
  return res.status(200).json(user);
};
