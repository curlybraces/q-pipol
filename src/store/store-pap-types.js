import { axiosInstance } from "boot/axios";

const state = {
  pap_types: [] // localStorage.getItem("pap_types") || [],
};

const mutations = {
  setPapTypes(state, value) {
    state.pap_types = value;
  }
};

const actions = {
  loadPapTypes({ commit }) {
    axiosInstance
      .get("/pap_types")
      .then(res => {
        localStorage.setItem("pap_types", JSON.stringify(res.data));
        commit("setPapTypes", res.data);
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
