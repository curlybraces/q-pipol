import { axiosInstance } from "boot/axios";

const state = {
  implementation_periods: [] // localStorage.getItem("implementation_periods") || [],
};

const mutations = {
  setImplementationPeriods(state, value) {
    state.implementation_periods = value;
  }
};

const actions = {
  loadImplementationPeriods({ commit }) {
    axiosInstance
      .get("/implementation_periods")
      .then(res => {
        localStorage.setItem(
          "implementation_periods",
          JSON.stringify(res.data)
        );
        commit("setImplementationPeriods", res.data);
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
