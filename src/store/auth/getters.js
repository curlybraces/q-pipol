//
export function avatar(state) {
  return state.me.avatar;
}

export function isLoggedIn(state) {
  return !!state.token;
}
