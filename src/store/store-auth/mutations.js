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

export function setAdmin(state, value) {
  state.isAdmin = value;
}

export function setReviewer(state, value) {
  state.isReviewer = value;
}

export function setEncoder(state, value) {
  state.isEncoder = value;
}

export function setViewer(state, value) {
  state.isViewer = value;
}
