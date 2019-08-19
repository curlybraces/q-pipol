import { axiosInstance } from "boot/axios";

const state = {
  challenges: [] // localStorage.getItem("categorizations") || [],
};

const mutations = {
  setChallenges(state, value) {
    state.challenges = value;
  }
};

const actions = {
  loadChallenges({ commit }) {
    axiosInstance
      .get("/challenges")
      .then(res => {
        localStorage.setItem("challenges", JSON.stringify(res.data));
        commit("setChallenges", res.data);
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
