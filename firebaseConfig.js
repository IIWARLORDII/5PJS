import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBGBsTfdwYX0nikDvWcyXQQTmYTSE1ey4o',
  authDomain: 'pjs-2024.firebaseapp.com',
  databaseURL: 'https://pjs-2024-default-rtdb.firebaseio.com',
  projectId: 'pjs-2024',
  storageBucket: 'pjs-2024.firebasestorage.app',
  messagingSenderId: '371531003875',
  appId: '1:371531003875:web:d42ef2d47effddda7552d6',
  measurementId: 'G-6HQD5YG0CJ',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
