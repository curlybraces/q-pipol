export function imageUrl(state) {
	return state.image_url
		? `statics/avatars/avatar-${state.image_url}.svg`
		: 'statics/avatars/undefined.svg';
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