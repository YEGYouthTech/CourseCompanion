import admin from 'firebase-admin';

import serviceAccount from '../../epsb-course-companion-firebase-adminsdk-yobpv-4dce5ea401.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://epsb-course-companion-default-rtdb.firebaseio.com',
});
