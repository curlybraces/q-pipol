import pdpChapters from "../statics/json/pdp_chapters.json";

const state = {
  pdpChapters: pdpChapters,
  selectedChapters: []
};

const mutations = {};

const actions = {};

const getters = {
  pdpChaptersFiltered: state => {
    let pdpChaptersFiltered = [];
    if (state.selectedChapters.length > 0) {
      pdpChaptersFiltered = [...state.pdpChapters].filter(chapter => {
        return state.selectedChapters.includes(chapter.value);
      });
      return pdpChaptersFiltered;
    }
    return state.pdpChapters;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
