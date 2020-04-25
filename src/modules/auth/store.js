import {Dialog, LocalStorage} from 'quasar';
import authService from './services/authService';
import { apolloClient, persistor } from '../../boot/apollo-boost';

const state = {
	user: null,
	loggedIn: LocalStorage.getItem('loggedIn') || false,
	token: LocalStorage.getItem('token') || '',
	unreadNotifications: [],
	loading: false,
	error: null
};

const mutations = {
	SET_USER: (state, payload) => {
		state.user = payload;
	},
	CLEAR_USER: (state) => {
		state.user = null;
	},
	CLEAR_TOKEN: (state) => {
		state.token = null;
	},
	SET_LOGGED_IN: (state, payload) => {
		state.loggedIn = payload;
	},
	SET_LOADING: (state, payload) => {
		state.loading = payload;
	},
	SET_ERROR: (state, payload) => {
		state.error = payload;
	}
};

const actions = {
	register: ({ commit }, payload) => {
		commit('SET_LOADING', true);
		
		authService
			.register(payload)
			.then(() => {
				Dialog.create({
					title: 'Registration Successful',
					message: 'You have successfully registered. Please check your email.',
					persistent: true,
					ok: true
				});
			})
			.catch(err => {
				console.log(err)
			})
			.finally(() => {
				commit('SET_LOADING', false);
			});
	},
	signinUser: ({ commit }, payload) => {
		// clear token so it does not get sent to server
		LocalStorage.set('token', '');
		
		commit('CLEAR_ERROR');
		
		commit('SET_LOADING', true);
		
		// call authService
		authService
			.login(payload)
			.then(response => {
				
				console.log(response);
				
				
				
				this.$router.go();
				
			})
			.catch(err => {
				console.error(err);
				
				commit('SET_ERROR', err);
			})
			.finally(() => {
				commit('SET_LOADING', false);
			})
	},
	getCurrentUser: ({ commit }) => {
		commit('SET_LOADING', true);
		
		authService
			.getCurrentUser()
			.then(response => {
				console.log(response);
			})
			.catch(err => console.error(err));
	},
	signoutUser: ({ commit }) => {
		apolloClient.clearStore();
		
		persistor.purge();
		
		// remove token and user from localStorage
		LocalStorage.remove('token');
		LocalStorage.remove('user');
		
		// remove user data from store
		commit('CLEAR_USER');
		
		// clear the token
		commit('CLEAR_TOKEN');
		
		// redirect to login page
		this.$router.replace('/login');
	}
};

const getters = {
	imageUrl: (state) => {
		if (!state.loading && state.user && state.user.image_url) {
			return state.user.image_url;
		} else {
			return 'statics/default.png';
		}
	},
	unreadNotifications: (state) => {
		let unreadNotifications = [];
		if (!state.loading && state.user && state.user.unreadNotifications) {
			unreadNotifications = state.user.unreadNotifications;
		}
		return unreadNotifications;
	},
	isLoggedIn: (state) => !!state.token,
	loading: (state) => state.loading,
	error: (state) => state.error,
	user: (state) => state.user,
	isSuperadmin: (state) => {
		if (!state.loading) {
			return state.user.role ? state.user.role.name === 'superadmin' : false;
		}
		return false;
	},
	isAdmin: (state) => {
		if (!state.loading) {
			return state.user.role
				? state.user.role.name === 'admin' ||
				state.user.role.name === 'superadmin'
				: false;
		}
		return false;
	},
	isEncoder: (state) => {
		if (!state.loading) {
			return state.user.role ? state.user.role.name === 'encoder' : false;
		}
		return false;
	},
	isVerified: (state) => {
		if (!state.loading) {
			return state.user.verified;
		}
		return false;
	}
};

export default {
	namespaced: true,
	state,
	getters,
	mutations,
	actions
};
