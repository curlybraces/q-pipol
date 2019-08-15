import { axiosInstance } from "boot/axios";

const state = {
  commodities: [] // localStorage.getItem("categorizations") || [],
};

const mutations = {
  setCommodities(state, value) {
    state.commodities = value;
  }
};

const actions = {
  loadCommodities({ commit }) {
    axiosInstance
      .get("/commodities")
      .then(res => {
        localStorage.setItem("commodities", JSON.stringify(res.data));
        commit("setCommodities", res.data);
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
