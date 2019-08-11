import { axiosInstance } from "boot/axios";

const state = {
  sustainable_development_goals: [], // localStorage.getItem("sustainable_development_goals") || [],
  ten_point_agenda: [], //  localStorage.getItem("ten_point_agenda") || []
  pdp_chapter: null
};

const mutations = {

  setSustainableDevelopmentGoals(state, value) {
    state.sustainable_development_goals = value;
  },
  setTenPointAgenda(state, value) {
    state.ten_point_agenda = value;
  },
  setPdpChapter(state, value) {
    state.pdp_chapter = value;
  }
};

const actions = {

  loadSustainableDevelopmentGoals({ commit }) {
    axiosInstance
      .get("/sustainable_development_goals")
      .then(res => {
        localStorage.setItem(
          "sustainable_development_goals",
          JSON.stringify(res.data)
        );
        commit("setSustainableDevelopmentGoals", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadTenPointAgenda({ commit }) {
    axiosInstance
      .get("/ten_point_agenda")
      .then(res => {
        localStorage.setItem("ten_point_agenda", JSON.stringify(res.data));
        commit("setTenPointAgenda", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
