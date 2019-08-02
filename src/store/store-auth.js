import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";
import { Loading, QSpinnerFacebook } from "quasar";

const state = {
  loggedIn: localStorage.getItem("loggedIn") || false,
  token: localStorage.getItem("token") || "",
  user: localStorage.getItem("user") || {}
};

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value;
  },
  setToken(state, value) {
    state.token = value;
  },
  setUser(state, value) {
    state.user = value;
  }
};

const actions = {
  registerUser(context, payload) {
    axiosInstance
      .post("/register", payload)
      .then(res => {
        Notify.create({
          message: res.data,
          position: "top",
          color: "success"
        });
      })
      .catch(e => {
        Notify.create({
          message: e.message,
          position: "top",
          color: "error"
        });
      });
  },
  loginUser({ commit }, payload) {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: 'Logging in...'
    });
    axiosInstance
      .post("/login", payload)
      .then(res => {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        axiosInstance.defaults.headers.common["Authorization"] =
          "Bearer " + res.data.token;

        commit("setLoggedIn", true);
        commit("setToken", res.data.token);
        commit("setUser", res.data.user);

        Loading.hide();

        this.$router.push("/");
      })
      .catch(e => {
        console.log(e.message);
      });
  },
  logoutUser({ commit }) {
    axiosInstance
      .post("/logout")
      .then(() => {
        commit("setLoggedIn", false);
        commit("setToken", "");
        commit("setUser", {});

        localStorage.removeItem("loggedIn");
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        this.$router.replace("/login");
      })
      .catch(e => {
        console.log(e.message);
      });
  }
};

const getters = {
  getLoggedIn(state) {
    return state.loggedIn;
  },
  getToken(state) {
    return state.token;
  },
  getUser(state) {
    return state.user;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
