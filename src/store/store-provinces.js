import { axiosInstance } from "boot/axios";

const state = {
  provinces: [] // localStorage.getItem("provinces") || [],
};

const mutations = {
  setProvinces(state, value) {
    state.provinces = value;
  }
};

const actions = {
  loadProvinces({ commit }) {
    axiosInstance
      .get("/provinces")
      .then(res => {
        localStorage.setItem("provinces", JSON.stringify(res.data));
        commit("setProvinces", res.data);
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
