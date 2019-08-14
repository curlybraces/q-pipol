import { axiosInstance } from "boot/axios";

const state = {
  new_thinkings: [] // localStorage.getItem("approval_levels") || [],
};

const mutations = {
  setNewThinkings(state, value) {
    state.new_thinkings = value;
  }
};

const actions = {
  loadNewThinkings({ commit }) {
    axiosInstance
      .get("/new_thinkings")
      .then(res => {
        localStorage.setItem("new_thinkings", JSON.stringify(res.data));
        commit("setNewThinkings", res.data);
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
