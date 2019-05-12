import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyBFdPWJ_47fY6K-V3YvUFqSpH9MZS41DTc",
  authDomain: "swe-stride-61b12.firebaseapp.com",
  databaseURL: "https://swe-stride-61b12.firebaseio.com",
  projectId: "swe-stride-61b12",
  storageBucket: "swe-stride-61b12.appspot.com",
  messagingSenderId: "592475915413"
};
firebase.initializeApp(config);

export default firebase;