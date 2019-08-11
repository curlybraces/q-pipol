import { axiosInstance } from "boot/axios";

const state = {
  city_municipalities: [] //  localStorage.getItem("city_municipalities") || [],
};

const mutations = {
  setCityMunicipalities(state, value) {
    state.city_municipalities = value;
  }
};

const actions = {
  loadCityMunicipalities({ commit }) {
    axiosInstance
      .get("/city_municipalities")
      .then(res => {
        localStorage.setItem("city_municipalities", JSON.stringify(res.data));
        commit("setCityMunicipalities", res.data);
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
