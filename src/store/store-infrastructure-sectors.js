import { axiosInstance } from "boot/axios";

const state = {
  infrastructure_sectors: [] // localStorage.getItem("infrastructure_sectors") || [],
};

const mutations = {
  setInfrastructureSectors(state, value) {
    state.infrastructure_sectors = value;
  }
};

const actions = {
  loadInfrastructureSectors({ commit }) {
    axiosInstance
      .get("/infrastructure_sectors")
      .then(res => {
        localStorage.setItem(
          "infrastructure_sectors",
          JSON.stringify(res.data)
        );
        commit("setInfrastructureSectors", res.data);
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
