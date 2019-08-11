import { axiosInstance } from "boot/axios";

const state = {
  spatial_coverages: [], // localStorage.getItem("spatial_coverages") || [],
};

const mutations = {
  setSpatialCoverages(state, value) {
    state.spatial_coverages = value;
  },
};

const actions = {
  loadSpatialCoverages({ commit }) {
    axiosInstance
      .get("/spatial_coverages")
      .then(res => {
        localStorage.setItem("spatial_coverages", JSON.stringify(res.data));
        commit("setSpatialCoverages", res.data);
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
