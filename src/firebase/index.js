// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBD0uQauKVwQHdD6FxAn-LCxg5zCthcDwM",
  authDomain: "admincitma-2d056.firebaseapp.com",
  databaseURL: "https://admincitma-2d056-default-rtdb.firebaseio.com",
  projectId: "admincitma-2d056",
  storageBucket: "admincitma-2d056.appspot.com",
  messagingSenderId: "937338741919",
  appId: "1:937338741919:web:ea285ad1d1de22bf38eeaa",
  measurementId: "G-DNW9PRWV61"
});
const db = getFirestore();
export default db