export function imageUrl(state) {
  if (!state.loading && state.user && state.user.image_url) {
    return state.user.image_url;
  } else {
    return 'statics/default.png';
  }
}

export function unreadNotifications(state) {
  let unreadNotifications = [];
  if (!state.loading && state.user && state.user.unreadNotifications) {
    unreadNotifications = state.user.unreadNotifications;
  }
  return unreadNotifications;
}

export function isLoggedIn(state) {
  return !!state.user;
}

export function loading(state) {
  return state.loading;
}

export function error(state) {
  return state.error;
}

export function errorMessage(state) {
  return state.errorMessage;
}

export function user(state) {
  return state.user;
}

export function isSuperadmin(state) {
  if (!state.loading) {
    return state.user.role ? state.user.role.name === 'superadmin' : false;
  }
  return false;
}

export function isAdmin(state) {
  if (!state.loading) {
    return state.user.role
      ? state.user.role.name === 'admin' ||
          state.user.role.name === 'superadmin'
      : false;
  }
  return false;
}

export function isEncoder(state) {
  if (!state.loading) {
    return state.user.role ? state.user.role.name === 'encoder' : false;
  }
  return false;
}

export function isVerified(state) {
  if (!state.loading) {
    return state.user.verified;
  }
  return false;
}
