import { apolloClient } from '../../boot/apollo';
import {
  ACTIVATE_USER,
  DEACTIVATE_USER,
  ALL_USERS,
  ASSIGN_ROLE_MUTATION
} from '../../constants/graphql';

export function fetchUsers({ commit }) {
  commit('SET_LOADING', true);
  apolloClient
    .query({
      query: ALL_USERS
    })
    .then(res => {
      res.data.users.forEach(user => {
        const payload = {
          id: user.id,
          user: user
        };
        commit('ADD_USER', payload);
        commit('SET_LOADING', false);
      });
    });
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
      return res.data;
    });
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
      return res.data;
    });
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
      commit('ASSIGN_ROLE', newRole);
      return;
    });
}

export function setSearch({ commit }, payload) {
  commit('SET_SEARCH', payload);
}
