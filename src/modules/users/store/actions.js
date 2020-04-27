import { apolloClient } from '../../../boot/apollo-boost';
import {
  ACTIVATE_USER,
  DEACTIVATE_USER,
  ASSIGN_ROLE_MUTATION,
  ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION
} from '../../../graphql/mutations';
import { ALL_USERS } from '../../../graphql/queries';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../../functions/function-show-notifications';

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
        id: 'ID' + res.data.assignRole.user.id,
        role: res.data.assignRole.user.role
      };

      showSuccessNotification({
        message: 'Successfully assigned role.'
      });

      commit('ASSIGN_ROLE', newRole);

      return;
    })
    .catch(err => console.log(err.message));
}

export function assignOperatingUnitToReview({}, payload) {
  return apolloClient
    .mutate({
      mutation: ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION,
      variables: {
        user_id: payload.id,
        operating_units: payload.operating_units
      }
    })
    .then(res => {
      const { message } = res.data.assignOperatingUnitToReview;
      showSuccessNotification({
        message: message
      });
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
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
