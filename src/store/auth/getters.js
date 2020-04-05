export function imageUrl(state) {
  return state.image_url
    ? `statics/avatars/avatar-${state.image_url}.svg`
    : 'statics/avatars/undefined.svg';
}

export function isLoggedIn(state) {
  return !!state.token;
}
