export function avatar(state) {
  if (state.user && state.user.avatar) {
    return state.user.avatar;
  } else {
    return 'statics/default.png';
  }
}

export function unreadNotifications(state) {
  let unreadNotifications = [];
  if (state.user && state.user.unreadNotifications) {
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

export function user(state) {
  return state.user;
}

export function isReviewer(state) {
  if (state.user) {
    return state.user.role ? state.user.role.name === 'reviewer' : false;
  }
  return false;
}

export function isSuperadmin(state) {
  if (state.user) {
    return state.user.role ? state.user.role.name === 'superadmin' : false;
  }
  return false;
}

export function isAdmin(state) {
  if (state.user) {
    return state.user.role
      ? state.user.role.name === 'admin' ||
          state.user.role.name === 'superadmin'
      : false;
  }
  return false;
}

export function isEncoder(state) {
  if (state.user) {
    return state.user.role ? state.user.role.name === 'encoder' : false;
  }
  return false;
}

export function isVerified(state) {
  if (state.user) {
    return state.user.verified;
  }
  return false;
}
