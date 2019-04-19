import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var config = {
    apiKey: "AIzaSyAi-VkHbOl0qeNNQ-BK4kITwIbtAs7B2D4",
    authDomain: "swe-stride.firebaseapp.com",
    databaseURL: "https://swe-stride.firebaseio.com",
    projectId: "swe-stride",
    storageBucket: "swe-stride.appspot.com",
    messagingSenderId: "606127698382"
  };
  firebase.initializeApp(config);

  export default firebase;