import { LocalStorage, Loading, Notify } from "quasar";
import { firebaseAuth, firebaseStorage } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function registerUser({ context }, payload) {
  console.log(context);
  Loading.show();
  firebaseAuth
    .createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
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

export function uploadPicture({}, payload) {
  console.log( payload.files, firebaseStorage )
  let user = firebaseAuth.currentUser.uid;
  let storageRef = firebaseStorage.ref(user + '/profile-picture/profilepicture')
  // storageRef.put(payload)
  console.log(storageRef)
}

export function handleAuthStateChange({ commit, dispatch }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
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
