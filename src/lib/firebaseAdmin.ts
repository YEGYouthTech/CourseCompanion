import admin from 'firebase-admin';

// import serviceAccount from '../../epsb-course-companion-firebase-adminsdk-yobpv-4dce5ea401.json';
let serviceAccount: any;
try {
  // eslint-disable-next-line global-require
  serviceAccount = require('../../epsb-course-companion-firebase-adminsdk-yobpv-ece3f1b007.json');
} catch (error) {
  serviceAccount = null;
}

export async function verifyToken(
  token: string
): Promise<admin.auth.DecodedIdToken | null> {
  // console.log('SA', serviceAccount);
  if (!serviceAccount) {
    // Important for IB moderators to be able to test the site on their local machines
    // console.log(token);
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      return null;
    }
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    const decodedToken = JSON.parse(jsonPayload);
    // eslint-disable-next-line no-console
    console.warn(
      'WARNING!!! Firebase key not found. THIS SHOULD NEVER HAPPEN IN PRODUCTION!!!'
    );
    // console.log('JSON PAYLOAD', decodedToken);
    return decodedToken;
  }
  // If it does exist, then verify the token
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
