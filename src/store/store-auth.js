import { axiosInstance } from "boot/axios";
import { Notify } from "quasar";
import { Loading, QSpinnerFacebook } from "quasar";

const state = {
  loggedIn: localStorage.getItem("loggedIn") || false,
  token: localStorage.getItem("token") || "",
  user: JSON.parse(localStorage.getItem("user")) || {},
  passwordChecked: false
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
  },
  setPasswordChecked(state, value) {
    state.passwordChecked = value;
  }
};

const actions = {
  registerUser(context, payload) {
    Loading.show();
    axiosInstance
      .post("/register", payload)
      .then(res => {
        Loading.hide();
        Notify.create({
          message: res.data,
          position: "top",
          color: "positive"
        });
      })
      .catch(e => {
        Loading.hide();
        Notify.create({
          message: e.message,
          position: "top",
          color: "negative"
        });
      });
  },
  loginUser({ commit }, payload) {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: "Logging in..."
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
        Loading.hide();

        Notify.create({
          message: e.message,
          position: "top",
          color: "red"
        });

        console.log(e.message);
      });
  },
  logoutUser({ commit }) {
    commit("setLoggedIn", false);
    commit("setToken", "");
    commit("setUser", {});

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    this.$router.replace("/login");
  },
  checkPassword({ commit }, payload) {
    axiosInstance
      .post("/check_password", { password: payload })
      .then(res => {
        commit("setPasswordChecked", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
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
