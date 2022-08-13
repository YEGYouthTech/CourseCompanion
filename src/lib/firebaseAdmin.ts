import admin from 'firebase-admin';

import serviceAccount from '../../epsb-course-companion-firebase-adminsdk-yobpv-4dce5ea401.json';

export async function verifyToken(
  token: string
): Promise<admin.auth.DecodedIdToken | null> {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://epsb-course-companion-default-rtdb.firebaseio.com',
    });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error(error);
    return null;
  }
}
