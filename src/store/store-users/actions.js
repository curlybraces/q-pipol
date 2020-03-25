import { apolloClient } from '../../boot/apollo';
import {
  ACTIVATE_USER,
  DEACTIVATE_USER,
  ALL_USERS,
  ASSIGN_ROLE_MUTATION
} from '../../constants/graphql';
import { Notify } from 'quasar';
import { showSuccessNotification } from '../../functions/function-show-notifications';

export function fetchUsers({ commit }) {
  commit('SET_LOADING', true);
  return apolloClient
    .query({
      query: ALL_USERS
    })
    .then(res => {
      res.data.users.forEach(user => {
        const payload = {
          id: 'ID' + user.id,
          user: user
        };
        commit('ADD_USER', payload);
      });
      commit('SET_LOADING', false);
    })
    .catch(err => console.log(err.message));
}

export function activateUser({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: ACTIVATE_USER,
      variables: {
        id: payload.id
      }
    })
    .then(res => {
      commit('ACTIVATE_USER', payload);

      showSuccessNotification({
        message: 'Successfully activated user.'
      });

      return res.data;
    })
    .catch(err => console.log(err.message));
}

export function deactivateUser({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: DEACTIVATE_USER,
      variables: {
        id: payload.id
      }
    })
    .then(res => {
      commit('DEACTIVATE_USER', payload);

      showSuccessNotification({
        message: 'Successfully deactivated user.'
      });

      return res.data;
    })
    .catch(err => console.log(err.message));
}

export function assignRole({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: ASSIGN_ROLE_MUTATION,
      variables: {
        user_id: payload.user_id,
        role_id: payload.role_id
      }
    })
    .then(res => {
      const newRole = {
        id: payload.user_id,
        role: res.data.assignRole.user.role
      };

      Notify.create({
        message: 'Successfully assigned role.',
        position: 'bottom-right',
        icon: 'check',
        color: 'green',
        timeout: 5000
      });

      commit('ASSIGN_ROLE', newRole);

      return;
    })
    .catch(err => console.log(err.message));
}

export function setSearch({ commit }, payload) {
  commit('SET_SEARCH', payload);
}

export function setSort({ commit }, payload) {
  commit('SET_SORT', payload);
}

export function setDirection({ commit }, payload) {
  commit('SET_DIRECTION', payload);
}
