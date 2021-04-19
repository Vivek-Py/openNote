import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyA4rQFiOSkfEATpHW5zrS0lPSROr24TiwU",
  authDomain: "evernote-per.firebaseapp.com",
  projectId: "evernote-per",
  storageBucket: "evernote-per.appspot.com",
  messagingSenderId: "675896191072",
  appId: "1:675896191072:web:267181364b2c68a1a3fb05",
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fire, db };
