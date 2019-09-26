import { Dialog, Notify } from "quasar";
import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

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

firebaseApp
  .firestore()
  .enablePersistence()
  .then(() => {
    Notify.create({
      message: "Message: Offline capabilities are enabled."
    });
  })
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
let firebaseStorage = firebaseApp.storage();

let projectRef = firebaseDb.collection("projects");

export { firebase, firebaseAuth, firebaseDb, firebaseStorage, projectRef };
