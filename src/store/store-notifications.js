import { axiosInstance } from "boot/axios";

const state = {
  notifications: []
};

const mutations = {
  setNotifications(state, value) {
    state.notifications = value;
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
  readNotification({ dispatch }, payload) {
    axiosInstance
      .get("/notifications/" + payload)
      .then(() => {
        dispatch("loadNotifications");
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  }
};

const getters = {
  notificationsCount: state => {
    return state.notifications.length;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
