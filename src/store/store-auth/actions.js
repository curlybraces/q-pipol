import { LocalStorage, Loading } from "quasar";
import { firebaseAuth } from "boot/firebase";
import { showErrorMessage } from "src/functions/function-show-error-message";

export function registerUser({ context }, payload) {
  console.log(context)
  Loading.show();
  firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      showErrorMessage(error.message);
    })
}

export function loginUser({ context }, payload) {
  console.log(context);
  Loading.show();
  firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
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

export function handleAuthStateChange({ commit }) {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) {
      Loading.hide();
      commit("setLoggedIn", true);
      LocalStorage.set("loggedIn", true);
      this.$router.push('/');
    }
    else {
      commit("setLoggedIn", false);
      LocalStorage.set("loggedIn", false);
      this.$router.replace('/login');
    }
  });
}
