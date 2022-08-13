/* eslint-disable import/no-anonymous-default-export */
import jwt from 'jsonwebtoken';

import { verifyToken } from '../../lib/firebaseAdmin';

export default async (req, res) => {
  // Generate a new token for the user given the firebase token
  const { token } = req.body;
  const decodedToken = await verifyToken(token);
  const { uid } = decodedToken;
  if (!uid) {
    return res.status(401).json({ error: 'Invalid token' });
  }
  const jwtToken = jwt.sign(
    { time: Date(), uid },
    process.env.JWT_SECRET || 'secret',
    {
      expiresIn: '1d',
    }
  );
  res.status(200).json({ token: jwtToken });
};
