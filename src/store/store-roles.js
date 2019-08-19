import { axiosInstance } from "boot/axios";

const state = {
  roles: [] // localStorage.getItem("roles") || [],
};

const mutations = {
  setRoles(state, value) {
    state.roles = value;
  }
};

const actions = {
  loadRoles({ commit }) {
    axiosInstance
      .get("/roles")
      .then(res => {
        localStorage.setItem("roles", JSON.stringify(res.data));
        commit("setRoles", res.data);
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
