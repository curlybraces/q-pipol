import { axiosInstance } from "boot/axios";

const state = {
  pdp_outcomes: [] // localStorage.getItem("pdp_outcomes") || [],
};

const mutations = {
  setPdpOutcomes(state, value) {
    state.pdp_outcomes = value;
  }
};

const actions = {
  loadPdpOutcomes({ commit }) {
    axiosInstance
      .get("/pdp_outcomes")
      .then(res => {
        localStorage.setItem("pdp_outcomes", JSON.stringify(res.data));
        commit("setPdpOutcomes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  }
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
