export function imageUrl(state) {
	if (!state.loading && state.user.image_url) {
		return `statics/avatars/avatar-${state.user.image_url}.svg`
	} else {
		return 'statics/avatars/undefined.png';
	}
}

export function isLoggedIn(state) {
  return !!state.token;
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

export function isAdmin(state) {
	if (!state.loading) {
		return state.user.role ? state.user.role.name === 'admin': false;
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