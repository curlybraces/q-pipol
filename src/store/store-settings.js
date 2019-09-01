const state = {
  dontShowAgain: false,
  dark: false
};

const mutations = {
  setDark(state, value) {
    state.dark = value;
  }
};

const actions = {
  setDark({ commit }, payload) {
    commit("setDark", payload);
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
