import { LocalStorage, Loading, Dialog } from 'quasar';
import { apolloClient } from 'boot/apollo-boost';
import {
  CHECK_EMAIL_AVAILABILITY_QUERY,
  GET_CURRENT_USER
} from '../../graphql/queries';
import {
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  RESEND_EMAIL_VERIFICATION_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  VERIFY_EMAIL_MUTATION,
  FORGOT_PASSWORD_MUTATION,
  UPDATE_IMAGE_URL_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '../../graphql/mutations';
import { showGraphQLErrorMessage } from 'src/functions/function-graphql-error-messages';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../functions/function-show-notifications';
import { persistor } from '../../boot/apollo-boost';

export function signinUser({ commit }, payload) {
	
  // clear token so it does not get sent to server
  LocalStorage.set('token', '');
  
  commit('CLEAR_ERROR');

  commit('SET_LOADING', true);

  apolloClient
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: payload
    })
    .then(({ data }) => {
      LocalStorage.set('token', data.login.access_token);

      commit('SET_LOADING', false);

      this.$router.go();
      
      // reset the store
      apolloClient.resetStore();
    })
    .catch(err => {
      commit('SET_ERROR', err);

      LocalStorage.set('token', '');

      commit('SET_LOADING', false);
    });
}

export function getCurrentUser({ commit }) {
  commit('SET_LOADING', true);
  
  apolloClient
    .query({
      query: GET_CURRENT_USER
    })
    .then(({ data }) => {
      LocalStorage.set('user', data.getCurrentUser);

      commit('SET_USER', data.getCurrentUser);

      commit('SET_LOADING', false);
    })
    .catch(err => {
      console.error(err);
      commit('SET_LOADING', false);
    });
}

export async function signoutUser({ commit }) {
	// see https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206 for info in purging cache
	
	// clear apolloClient store, this will not refetch queries unlike resetStore
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

export function hideValidateEmailReminder({ commit }, val) {
  LocalStorage.set('showValidateEmailReminder', val);
  commit('SET_SHOW_VALIDATE_EMAIL_REMINDER', val);
}

export function setImageUrl({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: UPDATE_IMAGE_URL_MUTATION,
      variables: {
        image_url: payload
      }
    })
    .then(() => {
      showSuccessNotification({
        message: 'Successfully updated avatar.',
        icon: 'check'
      });

      LocalStorage.set('image_url', payload);

      commit('SET_IMAGE_URL', payload);
    })
    .catch(err => console.log(err.message));
}

export function updateProfile({ commit }, payload) {
  commit('SET_LOADING', true);

  apolloClient
    .mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: payload
    })
    .then(() => {
      commit('SET_LOADING', false);

      showSuccessNotification({
        message: 'Successfully updated profile.'
      });

      this.$router.go();
    })
    .catch(err => {
      commit('SET_LOADING', false);

      console.log(err.message);
    });
}

export function forgotPassword({}, email) {
  return apolloClient
    .mutate({
      mutation: FORGOT_PASSWORD_MUTATION,
      variables: {
        email: email
      }
    })
    .then(res => {
      showSuccessNotification({
        message: res.data.forgotPassword.message
      });
    })
    .catch(err => {
      console.log(err.message);
    });
}

export function register({ commit }, payload) {
  commit('SET_LOADING', true);
  apolloClient
    .mutate({
      mutation: REGISTER_MUTATION,
      variables: payload
    })
    .then(res => {
      commit('SET_LOADING', false);
      console.log(res);
      Dialog.create({
        title: 'Registration Successful',
        message: 'You have successfully registered. Please check your email.',
        persistent: true,
        ok: true
      });
    })
    .catch(err => {
      commit('SET_LOADING', false);
      commit('SET_ERROR', err);
    });
}

export function resendEmailVerification({}, payload) {
  const email = payload;
  return apolloClient
    .mutate({
      mutation: RESEND_EMAIL_VERIFICATION_MUTATION,
      variables: {
        email: email
      }
    })
    .then(res => {
      showSuccessNotification({
        message: res.data.resendEmailVerification.message
      });
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}

export function verifyEmail({ commit, dispatch }, token) {
  return apolloClient
    .mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: {
        token: token
      }
    })
    .then(res => {
      console.log(res.data.verifyEmail);
      if (res.data.verifyEmail.access_token) {
        commit('SET_LOGGED_IN', true);

        LocalStorage.set('loggedIn', true);
        LocalStorage.set('token', res.data.verifyEmail.access_token);

        dispatch('populateUser');

        setTimeout(() => this.$router.push('/'), 1000);
      }
    })
    .catch(err => console.log(err.message));
}

export function updatePassword({ dispatch }, payload) {
  const { old_password, password, password_confirmation } = payload;

  Loading.show();

  apolloClient
    .mutate({
      mutation: UPDATE_PASSWORD_MUTATION,
      variables: {
        old_password: old_password,
        password: password,
        password_confirmation: password_confirmation
      }
    })
    .then(res => {
      console.log(res.data.updatePassword);
      if (res.data.updatePassword.status === 'PASSWORD_UPDATED') {
        dispatch('signoutUser');
      } else {
        return Promise.reject();
      }
    })
    .catch(err => {
      showGraphQLErrorMessage(err);
    })
    .finally(() => Loading.hide());
}

export function checkEmailAvailability({}, payload) {
  return apolloClient
    .query({
      query: CHECK_EMAIL_AVAILABILITY_QUERY,
      variables: {
        email: payload
      }
    })
    .then(res => {
      if (res.data.checkEmailAvailability.status === 'AVAILABLE') {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => console.log(err.message));
}
