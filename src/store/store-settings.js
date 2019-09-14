const state = {
  showWelcome: false,
  dark: false,
  userName: "",
  ipFocal: "",
  planningHead: "",
  agencyHead: ""
};

const mutations = {
  setDark(state, value) {
    state.dark = value;
  },
  setShowWelcome(state, value) {
    state.showWelcome = value;
  }
};

const actions = {
  setDark({ commit }, payload) {
    commit("setDark", payload);
  },
  setShowWelcome({ commit }, payload) {
    commit("setShowWelcome", payload);
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
