import { axiosInstance } from "boot/axios";

const state = {
  preparation_documents: [], // localStorage.getItem("preparation_documents") || [],
};

const mutations = {
  setPreparationDocuments(state, value) {
    state.preparation_documents = value;
  },
};

const actions = {
  loadPreparationDocuments({ commit }) {
    axiosInstance
      .get("/preparation_documents")
      .then(res => {
        localStorage.setItem("preparation_documents", JSON.stringify(res.data));
        commit("setPreparationDocuments", res.data);
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
