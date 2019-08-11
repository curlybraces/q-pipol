import { axiosInstance } from "boot/axios";

const state = {
  prexc_activities: [], // localStorage.getItem('prexc_activities') || [],
};

const mutations = {
  setPrexcActivities(state, value) {
    state.prexc_activities = value;
  },
};

const actions = {
  loadPrexcActivities({ commit }) {
    axiosInstance
      .get("/prexc_activities")
      .then(res => {
        localStorage.setItem("prexc_activities", JSON.stringify(res.data));
        commit("setPrexcActivities", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
};

const getters = {
  //
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
