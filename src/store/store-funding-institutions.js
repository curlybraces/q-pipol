import { axiosInstance } from "boot/axios";

const state = {
  funding_institutions: [] // localStorage.getItem("funding_institutions") || [],
};

const mutations = {
  setFundingInstitutions(state, value) {
    state.funding_institutions = value;
  }
};

const actions = {
  loadFundingInstitutions({ commit }) {
    axiosInstance
      .get("/funding_institutions")
      .then(res => {
        localStorage.setItem("funding_institutions", JSON.stringify(res.data));
        commit("setFundingInstitutions", res.data);
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
