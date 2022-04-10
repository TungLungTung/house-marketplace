// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyApkCgGVGf-fV3Adw_dwbmzJdBEiDSrl14',
  authDomain: 'house-marketplace-app-44855.firebaseapp.com',
  projectId: 'house-marketplace-app-44855',
  storageBucket: 'house-marketplace-app-44855.appspot.com',
  messagingSenderId: '454780828944',
  appId: '1:454780828944:web:2f8412175cec608310b995'
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
