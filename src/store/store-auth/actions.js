import { LocalStorage, Loading, Notify, Dialog } from "quasar";
import { firebaseAuth, firebaseDb } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function registerUser({ context }, payload) {
  console.log(context);
  Loading.show();
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      let ref = firebaseDb.collection("users");
      ref.doc(user.user.uid).set({
        email: payload.email,
        admin: false,
        reviewer: false,
        encoder: false,
        viewer: true
      });
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

export function loginUser({}, payload) {
  Loading.show();
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

export function logoutUser() {
  firebaseAuth.signOut();
}

export function changePassword({}, payload) {
  var user = firebaseAuth.currentUser;
  var newPassword = payload.password;

  user
    .updatePassword(newPassword)
    .then(() => {
      Notify.create("Successfully updated password.");
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
}

/*
 * Send email to user for verification
 */
export function sendEmailVerification() {
  var user = firebaseAuth.currentUser;
  user
    .sendEmailVerification()
    .then(() => {
      Dialog.create({
        message:
          "A verification link has been sent your registered email address."
      });
    })
    .catch(err => {
      Dialog.create(err.message);
    });
}

/*
 * Set roles of user
 */
export function setRoles({ commit }) {
  let userId = firebaseAuth.currentUser.uid;
  let ref = firebaseDb.collection("users");
  let userRef = ref.doc(userId);

  userRef.get().then(doc => {
    commit("setAdmin", doc.data().admin);
    commit("setEncoder", doc.data().encoder);
    commit("setReviewer", doc.data().reviewer);
    commit("setViewer", doc.data().viewer);
  });
}

export function handleAuthStateChange({ commit, dispatch }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      dispatch("setRoles", null);
      commit("setEmailVerified", user.emailVerified);
      Loading.hide();
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push("/");
      dispatch("projects/fbReadData", null, { root: true });
    } else {
      commit("projects/setProjectsDownloaded", false, { root: true });
      commit("projects/clearProjects", null, { root: true });
      commit("setLoggedIn", false);
      LocalStorage.set("loggedIn", false);
      this.$router.replace("/login");
    }
  });
}
