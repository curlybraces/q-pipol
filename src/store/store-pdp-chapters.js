import { axiosInstance } from "boot/axios";

const state = {
  pdp_chapters: [] // localStorage.getItem("pdp_chapters") || [],
};

const mutations = {
  setPdpChapters(state, value) {
    state.pdp_chapters = value;
  }
};

const actions = {
  loadPdpChapters({ commit }) {
    axiosInstance
      .get("/pdp_chapters")
      .then(res => {
        localStorage.setItem("pdp_chapters", JSON.stringify(res.data));
        commit("setPdpChapters", res.data);
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
