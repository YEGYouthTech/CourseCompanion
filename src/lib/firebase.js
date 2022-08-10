// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyApCLaq67xt08McGVrEbPBE_Uq9aO0KCJg',
  authDomain: 'epsb-course-companion.firebaseapp.com',
  projectId: 'epsb-course-companion',
  storageBucket: 'epsb-course-companion.appspot.com',
  messagingSenderId: '982455241731',
  appId: '1:982455241731:web:12a70c3e9fd792f2fc5236',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
