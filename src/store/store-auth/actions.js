import { LocalStorage } from 'quasar';
import { apolloClient } from 'boot/apollo';
import {
  LOGIN_MUTATION,
  ME_QUERY,
  UPDATE_IMAGE_URL_MUTATION,
  UPDATE_PROFILE_MUTATION
} from '../../constants/graphql';

export function loginUser({ commit, dispatch }, payload) {
  apolloClient
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

      this.$router.push({ path: '/' });
    })
    .then(() => {
      dispatch('populateUser');
    })
    .catch(err => {
      alert(err.message);
    });
}

export function populateUser({ commit }) {
  apolloClient
    .query({
      query: ME_QUERY
    })
    .then(res => {
      const {
        id,
        email,
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
      commit('SET_IMAGE_URL', image_url);
      commit('SET_OPERATING_UNIT_ID', operating_unit_id);
      commit('SET_CONTACT_NUMBER', contact_number);
      commit('SET_ROLE', role.name);
      commit('SET_POSITION', position);
    })
    .catch(err => {
      console.log(err.message);
      // Notify.create({
      //   title: 'Error',
      //   message: 'Something went wrong.'
      // });
    });
}

export function logoutUser({ commit }) {
  commit('projects/CLEAR_PROJECTS', null, { root: true });
  commit('CLEAR_USER');

  LocalStorage.remove('token');
  LocalStorage.remove('userId');
  LocalStorage.remove('loggedIn');

  apolloClient.cache.data.clear();

  this.$router.replace('/login');
}

export function setImageUrl({ commit }, payload) {
  apolloClient
    .mutate({
      mutation: UPDATE_IMAGE_URL_MUTATION,
      variables: {
        image_url: payload
      }
    })
    .then(res => {
      console.log(res.data);
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
    .then(res => {
      dispatch('populateUser');
      console.log(res);
      return;
    })
    .catch(err => console.log(err.message));
}
