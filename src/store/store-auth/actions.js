import { LocalStorage } from 'quasar';
import { apolloClient } from 'boot/apollo';
import {
  FORGOT_PASSWORD_MUTATION,
  LOGIN_MUTATION,
  ME_QUERY,
  REGISTER_MUTATION,
  RESEND_EMAIL_VERIFICATION_MUTATION,
  UPDATE_IMAGE_URL_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  UPDATE_PROFILE_MUTATION,
  VERIFY_EMAIL_MUTATION
} from '../../constants/graphql';
import { showGraphQLErrorMessage } from 'src/functions/function-graphql-error-messages';
import { showSuccessNotification } from '../../functions/function-show-notifications';

export function loginUser({ commit, dispatch }, payload) {
  return apolloClient
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        username: payload.username,
        password: payload.password
      }
    })
    .then(res => {
      commit('SET_LOGGED_IN', true);

      LocalStorage.set('loggedIn', true);
      LocalStorage.set('token', res.data.login.access_token);
      LocalStorage.set('userId', res.data.login.user.id);
      LocalStorage.set(
        'role',
        res.data.login.user.role ? res.data.login.user.role.name : null
      );

      this.$router.push({ path: '/' });
    })
    .then(() => {
      dispatch('populateUser');
    })
    .catch(err => {
      showGraphQLErrorMessage(err);
    })
    .finally(() => {
      return;
    });
}

export function populateUser({ commit }) {
  return apolloClient
    .query({
      query: ME_QUERY
    })
    .then(res => {
      const {
        id,
        email,
        verified,
        name,
        contact_number,
        role,
        operating_unit_id,
        position,
        image_url
      } = res.data.me;
      commit('SET_ME', res.data.me);
      commit('SET_ID', id);
      commit('SET_USER_LOADED', true);
      commit('SET_NAME', name);
      commit('SET_EMAIL', email);
      commit('SET_VERIFIED', verified);
      commit('SET_IMAGE_URL', image_url);
      commit('SET_OPERATING_UNIT_ID', operating_unit_id);
      commit('SET_CONTACT_NUMBER', contact_number);
      commit('SET_ROLE', role.name);
      commit('SET_POSITION', position);
    })
    .catch(err => {
      return err.message;
    });
}

export function logoutUser({ commit }) {
  commit('projects/CLEAR_PROJECTS', null, { root: true });
  commit('CLEAR_USER');

  localStorage.removeItem('vuex');

  LocalStorage.remove('token');
  LocalStorage.remove('userId');
  LocalStorage.remove('loggedIn');
  LocalStorage.remove('role');

  apolloClient.cache.data.clear();

  this.$router.replace('/login');
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

      commit('SET_IMAGE_URL', payload);
    })
    .catch(err => console.log(err.message));
}

export function updateProfile({ dispatch }, payload) {
  const { operating_unit_id, position, name, contact_number } = payload;

  return apolloClient
    .mutate({
      mutation: UPDATE_PROFILE_MUTATION,
      variables: {
        operating_unit_id: operating_unit_id,
        position: position,
        name: name,
        contact_number: contact_number
      }
    })
    .then(() => {
      dispatch('populateUser');

      showSuccessNotification({
        message: 'Successfully updated profile.'
      });

      return;
    })
    .catch(err => console.log(err.message));
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
      return res.data.forgotPassword;
    })
    .catch(err => {
      console.log(err.message);
    });
}

export function register({ commit, dispatch }, payload) {
  return apolloClient
    .mutate({
      mutation: REGISTER_MUTATION,
      variables: {
        email: payload.email,
        name: payload.name,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      }
    })
    .then(res => {
      commit('SET_LOGGED_IN', true);

      LocalStorage.set('loggedIn', true);
      LocalStorage.set('token', res.data.register.tokens.access_token);

      this.$router.push({ path: '/' });
    })
    .then(() => dispatch('populateUser'))
    .catch(err => console.log(err.message));
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
      console.log(err.message);
    });
}

export function verifyEmail({}, token) {
  return apolloClient
    .mutate({
      mutation: VERIFY_EMAIL_MUTATION,
      variables: {
        token: token
      }
    })
    .then(res => {
      console.log(res.data.verifyEmail);
    })
    .catch(err => console.log(err.message));
}

export function updatePassword({}, payload) {
  const { old_password, password, password_confirmation } = payload;

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
    })
    .catch(err => {
      showGraphQLErrorMessage(err);
    });
}
