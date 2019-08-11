import { axiosInstance } from "boot/axios";

const state = {
  implementation_bases: [] // localStorage.getItem("implementation_bases") || [],
};

const mutations = {
  setImplementationBases(state, value) {
    state.implementation_bases = value;
  }
};

const actions = {
  loadImplementationBases({ commit }) {
    axiosInstance
      .get("/implementation_bases")
      .then(res => {
        localStorage.setItem("implementation_bases", JSON.stringify(res.data));
        commit("setImplementationBases", res.data);
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
