import { axiosInstance } from "boot/axios";

const state = {
  programming_documents: [] // localStorage.getItem("programming_documents") || [],
};

const mutations = {
  setProgrammingDocuments(state, value) {
    state.programming_documents = value;
  }
};

const actions = {
  loadProgrammingDocuments({ commit }) {
    axiosInstance
      .get("/programming_documents")
      .then(res => {
        localStorage.setItem("programming_documents", JSON.stringify(res.data));
        commit("setProgrammingDocuments", res.data);
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
