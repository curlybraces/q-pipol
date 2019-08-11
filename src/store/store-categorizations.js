import { axiosInstance } from "boot/axios";

const state = {
  categorizations: [], // localStorage.getItem("categorizations") || [],
};

const mutations = {
  setCategorizations(state, value) {
    state.categorizations = value;
  },
};

const actions = {
  loadCategorizations({ commit }) {
    axiosInstance
      .get("/categorizations")
      .then(res => {
        localStorage.setItem("categorizations", JSON.stringify(res.data));
        commit("setCategorizations", res.data);
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
