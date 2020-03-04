import { LocalStorage } from "quasar";
import { apolloClient } from "boot/apollo";
import { LOGIN_MUTATION } from "../../constants/graphql";

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
      dispatch("auth/populateUser", res.data.login.user, { root: true });
      localStorage.setItem("token", res.data.login.access_token);
      localStorage.setItem("userId", res.data.login.user.id);
      this.$router.push({ path: "/" });
    })
    .catch(err => {
      console.log(err);
    });
}

export function populateUser({ commit }, payload) {
  commit("SET_USER_LOADED", true);
  commit("SET_NAME", payload.name);
  commit("SET_EMAIL", payload.email);
  commit("SET_IMAGE", payload.profile.operating_unit.image);
  commit("SET_OPERATING_UNIT", payload.profile.operating_unit.id);
  commit("SET_POSITION", payload.profile.position);
  commit("SET_UNIT", payload.profile.unit);
  commit("SET_ROLES", payload.roles);
  commit("SET_UNREAD_NOTIFICATIONS", payload.unreadNotifications);
  commit("SET_NOTIFICATIONS", payload.notifications);
}

export function logoutUser() {
  LocalStorage.remove("token");
  LocalStorage.remove("userId");

  apolloClient.cache.data.clear();

  this.$router.replace("/login");
}
