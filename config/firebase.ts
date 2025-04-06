import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyACJJlALwbGzeF0CiCqP1Eni00pDFbqJVE',
  authDomain: 'tictactoeapp-f07ff.firebaseapp.com',
  projectId: 'tictactoeapp-f07ff',
  storageBucket: 'tictactoeapp-f07ff.firebasestorage.app',
  messagingSenderId: '1052588191885',
  appId: '1:1052588191885:web:1a823b46a84bb6e2e772c4',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
