import { axiosInstance } from "boot/axios";

const state = {
  implementation_readinesses: [] // localStorage.getItem("implementation_readinesses") || [],
};

const mutations = {
  setImplementationReadinesses(state, value) {
    state.implementation_readinesses = value;
  }
};

const actions = {
  loadImplementationReadinesses({ commit }) {
    axiosInstance
      .get("/implementation_readinesses")
      .then(res => {
        localStorage.setItem(
          "implementation_readinesses",
          JSON.stringify(res.data)
        );
        commit("setImplementationReadinesses", res.data);
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
