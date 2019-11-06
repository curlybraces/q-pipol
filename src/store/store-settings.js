const state = {
  showWelcome: false,
  showAll: true,
  userName: "",
  ipFocal: "",
  planningHead: "",
  agencyHead: ""
};

const mutations = {
  setShowWelcome(state, value) {
    state.showWelcome = value;
  },
  setShowAll(state, value) {
    state.showAll = value;
  }
};

const actions = {
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
