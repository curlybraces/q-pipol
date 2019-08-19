import { axiosInstance } from "boot/axios";

const state = {
  contact_types: [] // localStorage.getItem("contact_types") || [],
};

const mutations = {
  setContactTypes(state, value) {
    state.contact_types = value;
  }
};

const actions = {
  loadContactTypes({ commit }) {
    axiosInstance
      .get("/contact_types")
      .then(res => {
        localStorage.setItem("contact_types", JSON.stringify(res.data));
        commit("setContactTypes", res.data);
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
