import * as firebase from "firebase/app";

import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyBxZzA8LBTNqfnTqK3Befo4TWCSJrBfoQE",
  authDomain: "pipol-31f6d.firebaseapp.com",
  databaseURL: "https://pipol-31f6d.firebaseio.com",
  projectId: "pipol-31f6d",
  storageBucket: "pipol-31f6d.appspot.com",
  messagingSenderId: "292803809927",
  appId: "1:292803809927:web:983f618398b6deea"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

export { firebaseAuth }
