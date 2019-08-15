import { axiosInstance } from "boot/axios";

const state = {
  priority_concerns: [] // localStorage.getItem("categorizations") || [],
};

const mutations = {
  setPriorityConcerns(state, value) {
    state.priority_concerns = value;
  }
};

const actions = {
  loadPriorityConcerns({ commit }) {
    axiosInstance
      .get("/priority_concerns")
      .then(res => {
        localStorage.setItem("priority_concerns", JSON.stringify(res.data));
        commit("setPriorityConcerns", res.data);
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
