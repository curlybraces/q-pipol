import { LocalStorage, Loading, Notify, Dialog } from "quasar";
import { firebaseAuth, firebaseDb, googleProvider } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function registerUser({ dispatch }, payload) {
  Loading.show();
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(user => {
      let ref = firebaseDb.collection("users");

      dispatch("setDisplayName", payload.displayName);

      ref.doc(user.user.uid).set({
        email: payload.email,
        displayName: payload.displayName,
        admin: false,
        reviewer: false,
        encoder: false,
        viewer: true
      });

      this.$router.go("/");
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

export function setDisplayName({}, payload) {
  var user = firebaseAuth.currentUser;
  user.updateProfile({
    displayName: payload.displayName
  });
}

export function loginUser({}, payload) {
  Loading.show();
  firebaseAuth
    .signInWithEmailAndPassword(payload.email, payload.password)
    .then(() => {
      Notify.create("Welcome back!");
      this.$router.go("/");
    })
    .catch(error => {
      showErrorMessage(error.message);
    });
}

export function signInWithGoogle({}) {
  firebaseAuth
    .signInWithPopup(googleProvider)
    .then(() => {
      this.$router.go("/");
    })
    .catch(err => {
      showErrorMessage(err.message);
    });
}

export function logoutUser() {
  firebaseAuth.signOut();
}

export function changePassword({}, payload) {
  var user = firebaseAuth.currentUser;

  user
    .updatePassword(payload.password)
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

export function sendResetPasswordEmail({}, payload) {
  firebaseAuth
    .sendPasswordResetEmail(payload.email)
    .then(() => {
      Dialog.create({
        message: "We have sent a password reset link to the email provided."
      });
    })
    .catch(err => {
      Dialog.create(err.message);
    });
}

export function handleAuthStateChange({ commit, dispatch }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      commit("setEmailVerified", user.emailVerified);
      commit("setDisplayName", user.displayName);
      commit("setEmail", user.email);
      Loading.hide();
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      dispatch("projects/fbReadData", null, { root: true });
      dispatch("directory/fbReadData", null, { root: true });
      dispatch("submissions/fbReadData", null, { root: true });
    } else {
      commit("setDisplayName", "");
      commit("setEmail", "");
      commit("projects/setProjectsDownloaded", false, { root: true });
      commit("projects/clearProjects", null, { root: true });
      commit("directory/clearDirectory", null, { root: true });
      commit("projects/clearSubmissions", null, { root: true });
      commit("setLoggedIn", false);
      LocalStorage.set("loggedIn", false);
      this.$router.replace("/login");
    }
  });
}
