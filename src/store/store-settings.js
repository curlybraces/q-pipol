const state = {
  showWelcome: false,
  showAll: true,
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
  },
  setShowAll(state, value) {
    state.showAll = value;
  }
};

const actions = {
  setDark({ commit }, payload) {
    commit("setDark", payload);
  },
  setShowWelcome({ commit }, payload) {
    commit("setShowWelcome", payload);
  },
  setShowAll({ commit }, payload) {
    commit("setShowAll", payload);
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
