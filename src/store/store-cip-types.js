import { axiosInstance } from "boot/axios";

const state = {
  cip_types: [] // localStorage.getItem("cip_types") || [],
};

const mutations = {
  setCipTypes(state, value) {
    state.cip_types = value;
  }
};

const actions = {
  loadCipTypes({ commit }) {
    axiosInstance
      .get("/cip_types")
      .then(res => {
        localStorage.setItem("cip_types", JSON.stringify(res.data));
        commit("setCipTypes", res.data);
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
