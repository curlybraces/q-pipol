import { axiosInstance } from "boot/axios";

const state = {
  pdp_indicators: [] // localStorage.getItem("pdp_indicators") || [],
};

const mutations = {
  setPdpIndicators(state, value) {
    state.pdp_indicators = value;
  }
};

const actions = {
  loadPdpIndicators({ commit }) {
    axiosInstance
      .get("/pdp_indicators")
      .then(res => {
        localStorage.setItem("pdp_indicators", JSON.stringify(res.data));
        commit("setPdpIndicators", res.data);
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
