import { axiosInstance } from "boot/axios";

const state = {
  pdp_chapter: null
};

const mutations = {
  setPdpChapter(state, value) {
    state.pdp_chapter = value;
  }
};

const actions = {
  setPdpChapter({ commit }, value) {
    commit("setPdpChapter", value);
  }
};

const getters = {
  pdpOutcomesFiltered: state => {
    if (state.pdp_chapter) {
      return state.pdp_outcomes.filter(outcome => {
        return outcome.pdp_chapter_id == state.pdp_chapter;
      });
    }
    return state.pdp_outcomes;
  },
  pdp_outcomes: (state, getters) => {
    var pdp_outcomes = getters.pdpOutcomesFiltered;
    if (pdp_outcomes) {
      return pdp_outcomes;
    }
    return state.pdp_outcomes;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
