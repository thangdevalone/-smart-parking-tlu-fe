import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDesytx95kmVBiWm7O9klDHxKNdIr_C_HU',
  authDomain: 'kltn-7bb93.firebaseapp.com',
  databaseURL: 'https://kltn-7bb93-default-rtdb.asia-southeast1.firebasedatabase.app/',
  projectId: 'kltn-7bb93',
  storageBucket: 'kltn-7bb93.appspot.com',
  messagingSenderId: '929036188338',
  appId: '1:929036188338:web:abf5e559eb762634f0a7ab',
  measurementId: 'G-ST0RS8W8TD',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };