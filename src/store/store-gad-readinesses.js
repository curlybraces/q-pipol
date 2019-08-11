import { axiosInstance } from "boot/axios";

const state = {
  gad_readinesses: [], // localStorage.getItem("gad_readinesses") || [],
};

const mutations = {
  setGadReadinesses(state, value) {
    state.gad_readinesses = value;
  },
};

const actions = {
  loadGadReadinesses({ commit }) {
    axiosInstance
      .get("/gad_readinesses")
      .then(res => {
        localStorage.setItem("gad_readinesses", JSON.stringify(res.data));
        commit("setGadReadinesses", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
