import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEjlYWgZtkFvyjwclpoq5jNmyL6rWsu54",
  authDomain: "i-m-he.firebaseapp.com",
  projectId: "i-m-he",
  storageBucket: "i-m-he.appspot.com",
  messagingSenderId: "827125170884",
  appId: "1:827125170884:web:7f0a50d8e84281fa6eff91",
  measurementId: "G-XB5S7FRGWE"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { FIREBASE_APP, FIREBASE_AUTH };
