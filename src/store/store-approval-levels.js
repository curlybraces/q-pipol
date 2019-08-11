import { axiosInstance } from "boot/axios";

const state = {
  approval_levels: [], // localStorage.getItem("approval_levels") || [],
};

const mutations = {
  setApprovalLevels(state, value) {
    state.approval_levels = value;
  },
};

const actions = {
  loadApprovalLevels({ commit }) {
    axiosInstance
      .get("/approval_levels")
      .then(res => {
        localStorage.setItem("approval_levels", JSON.stringify(res.data));
        commit("setApprovalLevels", res.data);
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
