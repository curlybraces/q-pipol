import { axiosInstance } from "boot/axios";

const state = {
  sustainable_development_goals: [] // localStorage.getItem("sustainable_development_goals") || [],
};

const mutations = {
  setSustainableDevelopmentGoals(state, value) {
    state.sustainable_development_goals = value;
  }
};

const actions = {
  loadSustainableDevelopmentGoals({ commit }) {
    axiosInstance
      .get("/sustainable_development_goals")
      .then(res => {
        localStorage.setItem(
          "sustainable_development_goals",
          JSON.stringify(res.data)
        );
        commit("setSustainableDevelopmentGoals", res.data);
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
