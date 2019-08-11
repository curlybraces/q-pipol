import { axiosInstance } from "boot/axios";

const state = {
  funding_sources: [] // localStorage.getItem("funding_sources") || [],
};

const mutations = {
  setFundingSources(state, value) {
    state.funding_sources = value;
  }
};

const actions = {
  loadFundingSources({ commit }) {
    axiosInstance
      .get("/funding_sources")
      .then(res => {
        localStorage.setItem("funding_sources", JSON.stringify(res.data));
        commit("setFundingSources", res.data);
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
