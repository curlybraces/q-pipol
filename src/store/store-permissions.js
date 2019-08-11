import { axiosInstance } from "boot/axios";

const state = {
  permissions: [], // localStorage.getItem("permissions") || [],
};

const mutations = {
  setPermissions(state, value) {
    state.permissions = value;
  },
};

const actions = {
  loadPermissions({ commit }) {
    axiosInstance
      .get("/permissions")
      .then(res => {
        localStorage.setItem("permissions", JSON.stringify(res.data));
        commit("setPermissions", res.data);
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
