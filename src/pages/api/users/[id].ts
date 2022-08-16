/* eslint-disable import/no-anonymous-default-export */
import { verifyToken } from '@/lib/firebaseAdmin';

import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;
  if (method !== 'GET' && method !== 'PUT' && method !== 'DELETE') {
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
      query: { id },
    } = req;
    let userMayAccessTargetTimetable = false;
    // Allow access if the user is reading their own profile
    userMayAccessTargetTimetable =
      userMayAccessTargetTimetable || id === user.user_id;
    // Allow access if the user is a member of a mutual group
    const dbUser = (await User.where('uid').equals(user.user_id))[0] || null;
    const targetUser = (await User.where('uid').equals(id))[0] || null;
    if (!dbUser) {
      // You don't exist
      return res
        .status(400)
        .json({ error: 'Your user was not found in the database' });
    }
    if (!targetUser) {
      // The target user doesn't exist
      return res.status(404).json({ error: 'User not found' });
    }
    userMayAccessTargetTimetable =
      userMayAccessTargetTimetable ||
      dbUser.groups.some((group) => targetUser.groups.includes(group));
    return res.status(200).json({
      uid: targetUser.uid,
      name: targetUser.name,
      email: targetUser.email,
      profileImage: targetUser.profileImage,
      grade: targetUser.grade,
      school: targetUser.school,
      groups: id === user.user_id ? targetUser.groups : undefined,
      pendingInvites:
        id === user.user_id ? targetUser.pendingInvites : undefined,

      timetable: userMayAccessTargetTimetable
        ? targetUser.timetable
        : undefined,
      createdAt: targetUser.createdAt,
    });
  }
  if (method === 'PUT') {
    const {
      query: { id },
      body: { timetable, grade, school },
    } = req;
    // Users may not modify other users
    if (id !== user.user_id) {
      return res.status(403).json({ error: 'You may not modify other users' });
    }
    const dbUser = (await User.where('uid').equals(id))[0] || null;
    if (!dbUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    await dbUser.update({
      timetable: JSON.stringify(timetable) || dbUser.timetable,
      school: school || undefined,
      grade: grade || undefined,
    });
    return res.status(200).json({
      success: true,
    });
  }
  if (method === 'DELETE') {
    // TODO: Secure this endpoint
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
