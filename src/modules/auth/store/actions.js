import { LocalStorage, Loading, Dialog } from 'quasar';
import { client, persistor } from 'boot/apollo';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';

import { authService, profileService } from '@/services';

export function register({ commit }, payload) {
  Loading.show();
  return authService
    .register(payload)
    .then(res => {
      commit('SET_LOADING', false);
      console.log('response', res);
      Dialog.create({
        title: 'Registration Successful',
        message: 'You have successfully registered. Please check your email.',
        persistent: true,
        ok: true
      });
    })
    .catch(err => {
      commit('SET_LOADING', false);
      commit('SET_ERROR', err.message);
    })
    .finally(() => Loading.hide());
}

export function signinUser({ commit }, payload) {
  // clear token so it does not get sent to server
  LocalStorage.set('token', '');

  commit('CLEAR_ERROR');

  Loading.show();

  return authService
    .login(payload)
    .then(res => {
      LocalStorage.set('token', res.login.access_token);

      commit('SET_LOADING', false);

      this.$router.go();

      // reset the store
      client.resetStore();
    })
    .catch(err => {
      console.error(err.message);
      LocalStorage.set('token', '');
    })
    .finally(() => Loading.hide());
}

export function getCurrentUser({ commit }) {
  commit('SET_LOADING', true);

  return profileService
    .getCurrentUser()
    .then(res => {
      LocalStorage.set('user', res.getCurrentUser);

      commit('SET_USER', res.getCurrentUser);

      commit('SET_LOADING', false);
    })
    .catch(err => {
      console.error(err);
      commit('SET_LOADING', false);
    });
}

export function clearError({ commit }) {
  commit('CLEAR_ERROR');
}

export async function signoutUser({ commit }) {
  // see https://github.com/apollographql/apollo-cache-persist/issues/34#issuecomment-371177206 for info in purging cache

  // clear client store, this will not refetch queries unlike resetStore
  client.clearStore();

  persistor.purge();

  // remove token and user from localStorage
  LocalStorage.remove('token');
  LocalStorage.remove('user');

  // remove user data from store
  commit('CLEAR_USER');

  // clear the token
  commit('CLEAR_TOKEN');

  // redirect to login page
  this.$router.replace({ name: 'login' });
}

export function forgotPassword({}, email) {
  Loading.show();

  return authService
    .forgotPassword({ email: email })
    .then(res => {
      if (res.forgotPassword.status === 'EMAIL_NOT_SENT') {
        showErrorNotification({
          message: res.forgotPassword.message
        });
      } else {
        showSuccessNotification({
          message: res.forgotPassword.message
        });
      }
    })
    .catch(err => {
      console.log(err.message);
    })
    .finally(() => Loading.hide());
}

export function resendEmailVerification({}, payload) {
  Loading.show();

  return authService
    .resendEmailVerification(payload)
    .then(res => {
      showSuccessNotification({
        message: res.data.resendEmailVerification.message
      });
    })
    .catch(err => {
      console.log(err.message);
    })
    .finally(() => Loading.hide());
}

export function verifyEmail({ commit, dispatch }, token) {
  return authService
    .verifyEmail({ token: token })
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
    .catch(err => console.error(err.message));
}

export function updatePassword({ dispatch }, payload) {
  Loading.show();

  return authService
    .updatePassword(payload)
    .then(res => {
      console.log(res.updatePassword);
      if (res.updatePassword.status === 'PASSWORD_UPDATED') {
        dispatch('signoutUser');
      } else {
        return Promise.reject();
      }
    })
    .catch(err => {
      console.error(err.message);
    })
    .finally(() => Loading.hide());
}

export function checkEmailAvailability({}, payload) {
  return authService
    .checkEmailAvailability({ email: payload })
    .then(res => {
      if (res.checkEmailAvailability.status === 'AVAILABLE') {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err.message);
      return false;
    });
}
