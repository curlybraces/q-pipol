import { apolloClient } from "../../boot/apollo";
import {
  ACTIVATE_USER,
  DEACTIVATE_USER,
  ALL_USERS,
  ASSIGN_ROLE_MUTATION
} from "../../constants/graphql";

export function fetchUsers({ commit }) {
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
        commit("ADD_USER", payload);
      });
      // commit("SET_USERS", res.data.users);
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
      commit("UPDATE_USER", payload);
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
      commit("UPDATE_USER", payload);
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
      console.log(commit);
      return res;
    });
}

export function setSearch({ commit }, payload) {
  commit("SET_SEARCH", payload);
}
