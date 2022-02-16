/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need

import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDs-fvJHM9UnSZpnziE3-Eqg6q4ksaAp84',
  authDomain: 'panificadora-ubaense.firebaseapp.com',
  projectId: 'panificadora-ubaense',
  storageBucket: 'panificadora-ubaense.appspot.com',
  messagingSenderId: '904834185245',
  appId: '1:904834185245:web:b226e38f686a160c8f6ef4',
  measurementId: 'G-ZQKNCQCT1V',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export default storage;
