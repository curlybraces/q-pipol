import { axiosInstance } from "boot/axios";

const state = {
  operating_units: [] // localStorage.getItem("operating_units") || [],
};

const mutations = {
  setOperatingUnits(state, value) {
    state.operating_units = value;
  }
};

const actions = {
  loadOperatingUnits({ commit }) {
    axiosInstance
      .get("/operating_units")
      .then(res => {
        localStorage.setItem("operating_units", JSON.stringify(res.data));
        commit("setOperatingUnits", res.data);
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
