import { axiosInstance } from "boot/axios";

const state = {
  notifications: [],
  allNotifications: []
};

const mutations = {
  setNotifications(state, value) {
    state.notifications = value;
  },
  setAllNotifications(state, value) {
    state.allNotifications = value;
  }
};

const actions = {
  loadNotifications({ commit }) {
    axiosInstance
      .get("/notifications")
      .then(res => {
        commit("setNotifications", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadAllNotifications({ commit }) {
    axiosInstance
      .get("/notifications_all")
      .then(res => {
        commit("setAllNotifications", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
