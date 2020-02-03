import { LocalStorage } from "quasar";
import { loginUser } from "../../functions/function-login-user";
import { createUser } from "../../functions/function-create-user";
import { retrieveUserInfo } from "../../functions/function-retrieve-user-info";
import { setAuthHeader } from "boot/axios";

export function create({}, { name, email, password, selectedRoles = [] }) {
  createUser({ name, email, password, selectedRoles });
}

export function login({ commit, dispatch }, { email, password }) {
  loginUser({ email, password }).then(res => {
    if (!res) {
      return;
    } else {
      LocalStorage.set("token", res);
      LocalStorage.set("loggedIn", true);
      commit("SET_TOKEN", res);
      commit("SET_LOGGED_IN", true);
      setAuthHeader(res);

      dispatch("retrieveUser");

      this.$router.push("/");
    }
  });
}

export function retrieveUser({ commit }) {
  retrieveUserInfo().then(res => {
    commit("SET_NAME", res.name);
    commit("SET_EMAIL", res.email);
    commit("SET_IMAGE", res.profile.operating_unit.image);
    commit("SET_OPERATING_UNIT", res.profile.operating_unit.id);
    commit("SET_POSITION", res.profile.position);
    commit("SET_UNIT", res.profile.unit);
    commit("SET_ROLES", res.roles);
  });
}

export function logoutUser() {
  LocalStorage.remove("token");
  LocalStorage.remove("loggedIn");

  this.$router.replace("/login");
}
