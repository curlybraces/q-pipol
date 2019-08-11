import { axiosInstance } from "boot/axios";

const state = {
  regions: [], //  localStorage.getItem("regions") || [],
};

const mutations = {
  setRegions(state, value) {
    state.regions = value;
  },
};

const actions = {
  loadRegions({ commit }) {
    axiosInstance
      .get("/regions")
      .then(res => {
        localStorage.setItem("regions", JSON.stringify(res.data));
        commit("setRegions", res.data);
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
