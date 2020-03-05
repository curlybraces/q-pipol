import { apolloClient } from "../../boot/apollo";
import { ACTIVATE_USER, ALL_USERS } from "../../constants/graphql";

export function fetchUsers({ commit }) {
  apolloClient
    .query({
      query: ALL_USERS
    })
    .then(res => {
      commit("SET_USERS", res.data.users);
    });
}

export function activateUser({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: ACTIVATE_USER,
      variables: {
        id: payload.id,
        active: payload.active
      }
    })
    .then(res => {
      commit("UPDATE_USER", payload);
      return res.data;
    });
}
