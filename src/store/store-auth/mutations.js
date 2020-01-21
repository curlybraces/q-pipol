export function setLoggedIn(state, value) {
  state.loggedIn = value;
}

export function setEmailVerified(state, value) {
  state.emailVerified = value;
}

export function setEmail(state, value) {
  state.currentUserEmail = value;
}

export function setDisplayName(state, value) {
  state.currentUserDisplayName = value;
}

export function setPhotoURL(state, value) {
  state.photoURL = value;
}

export function setSignInProvider(state, value) {
  state.signInProvider = value;
}
