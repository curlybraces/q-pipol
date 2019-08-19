import { axiosInstance } from "boot/axios";

const state = {
  implementation_modes: []
};

const mutations = {
  setImplementationModes(state, value) {
    state.implementation_modes = value;
  }
};

const actions = {
  loadImplementationModes({ commit }) {
    axiosInstance
      .get("/implementation_modes")
      .then(res => {
        localStorage.setItem("implementation_modes", JSON.stringify(res.data));
        commit("setImplementationModes", res.data);
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
