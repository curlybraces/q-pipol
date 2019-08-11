import { axiosInstance } from "boot/axios";

const state = {
  pip_types: [] // localStorage.getItem("preparation_documents") || [],
};

const mutations = {
  setPipTypes(state, value) {
    state.pip_types = value;
  }
};

const actions = {
  loadPipTypes({ commit }) {
    axiosInstance
      .get("/pip_types")
      .then(res => {
        localStorage.setItem("pip_types", JSON.stringify(res.data));
        commit("setPreparationDocuments", res.data);
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
