import { axiosInstance } from "boot/axios";

const state = {
  infrastructure_subsectors: [] // localStorage.getItem("infrastructure_subsectors") || [],
};

const mutations = {
  setInfrastructureSubsectors(state, value) {
    state.infrastructure_subsectors = value;
  }
};

const actions = {
  loadInfrastructureSubsectors({ commit }) {
    axiosInstance
      .get("/infrastructure_subsectors")
      .then(res => {
        localStorage.setItem(
          "infrastructure_subsectors",
          JSON.stringify(res.data)
        );
        commit("setInfrastructureSubsectors", res.data);
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
