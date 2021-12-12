// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
let firebaseApp;
debugger
if(window.location.href.indexOf("localhost") != -1){
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseApp = initializeApp({
    apiKey: "AIzaSyAi333D2hlT66pn1ZmKnobLFZnCE4v7X-Y",
    authDomain: "crud-fb7a7.firebaseapp.com",
    databaseURL: "https://crud-fb7a7-default-rtdb.firebaseio.com",
    projectId: "crud-fb7a7",
    storageBucket: "crud-fb7a7.appspot.com",
    messagingSenderId: "260827575023",
    appId: "1:260827575023:web:e24ff69f37a8cc2bf2e11a",
    measurementId: "G-DQ711TZ55H"
});
}else{
  firebaseApp = initializeApp({
    apiKey: "AIzaSyBD0uQauKVwQHdD6FxAn-LCxg5zCthcDwM",
    authDomain: "admincitma-2d056.firebaseapp.com",
    databaseURL: "https://admincitma-2d056-default-rtdb.firebaseio.com",
    projectId: "admincitma-2d056",
    storageBucket: "admincitma-2d056.appspot.com",
    messagingSenderId: "937338741919",
    appId: "1:937338741919:web:ea285ad1d1de22bf38eeaa",
    measurementId: "G-DNW9PRWV61"
  });
}



 
const db = getFirestore();
export default db