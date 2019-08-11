import { axiosInstance } from "boot/axios";

const state = {
  pdp_outputs: [], //  localStorage.getItem("pdp_outputs") || [],
};

const mutations = {
  setPdpOutputs(state, value) {
    state.pdp_outputs = value;
  },
};

const actions = {
  loadPdpOutputs({ commit }) {
    axiosInstance
      .get("/pdp_outputs")
      .then(res => {
        localStorage.setItem("pdp_outputs", JSON.stringify(res.data));
        commit("setPdpOutputs", res.data);
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
