import { LocalStorage } from "quasar";
import { apolloClient } from "boot/apollo";
import { LOGIN_MUTATION, ME_QUERY } from "../../constants/graphql";

export function loginUser({ dispatch }, payload) {
  apolloClient
    .mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        username: payload.username,
        password: payload.password
      }
    })
    .then(res => {
      dispatch("auth/populateUser", null, { root: true });
      localStorage.setItem("token", res.data.login.access_token);
      localStorage.setItem("userId", res.data.login.user.id);
      this.$router.push({ path: "/" });
    })
    .catch(err => {
      console.log(err);
    });
}

export function populateUser({ commit }) {
  apolloClient.query({
    query: ME_QUERY
  })
    .then(res => {
      const { email, name, contact_number, role, operating_unit, position } = res.data.me;
      commit("SET_ME",res.data.me);
      commit("SET_USER_LOADED", true);
      commit("SET_NAME", name);
      commit("SET_EMAIL", email);
      commit(
        "SET_IMAGE",
        operating_unit ? operating_unit.image : ""
      );
      commit(
        "SET_OPERATING_UNIT",
        operating_unit ? operating_unit.id : ""
      );
      commit(
        "SET_CONTACT_NUMBER", contact_number
      );
      commit(
        "SET_ROLE", role.name
      );
      commit("SET_POSITION", position);
    });
}

export function logoutUser() {
  LocalStorage.remove("token");
  LocalStorage.remove("userId");

  apolloClient.cache.data.clear();

  this.$router.replace("/login");
}
