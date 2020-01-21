import { Dialog } from "quasar";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
  // apiKey: "AIzaSyBxZzA8LBTNqfnTqK3Befo4TWCSJrBfoQE",
  // authDomain: "pipol-31f6d.firebaseapp.com",
  // databaseURL: "https://pipol-31f6d.firebaseio.com",
  // projectId: "pipol-31f6d",
  // storageBucket: "pipol-31f6d.appspot.com",
  // messagingSenderId: "292803809927",
  // appId: "1:292803809927:web:983f618398b6deea"
  apiKey: "AIzaSyDJNqgmoBjVyT_jd8XEY3IVopQGcTd3i3E",
  authDomain: "eplanning-da.firebaseapp.com",
  databaseURL: "https://eplanning-da.firebaseio.com",
  projectId: "eplanning-da",
  storageBucket: "eplanning-da.appspot.com",
  messagingSenderId: "1080360246717",
  appId: "1:1080360246717:web:0f5b5b89bddce38b27c6d4",
  measurementId: "G-8025Z3ED4Q"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth();

firebaseApp
  .firestore()
  .enablePersistence()
  .catch(err => {
    if (err.code == "failed-precondition") {
      Dialog.create({
        message: "Offline capabilities does not support multiple tabs."
      });
    } else if (err.code == "unimplemented") {
      Dialog.create({
        message: "Your browser does not support offline capabilities."
      });
    }
  });

let firebaseDb = firebaseApp.firestore();
let firebaseRealtime = firebaseApp.database();
let firebaseStorage = firebaseApp.storage();

let projectRef = firebaseDb.collection("projects");
let submissionsRef = firebaseDb.collection("submissions");
let userRef = firebaseDb.collection("users");

const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export {
  firebase,
  firebaseAuth,
  firebaseDb,
  firebaseRealtime,
  firebaseStorage,
  projectRef,
  submissionsRef,
  userRef,
  googleProvider
};
