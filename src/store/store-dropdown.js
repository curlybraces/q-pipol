import { axiosInstance } from "boot/axios";

const state = {

  pdp_outcomes: [], // localStorage.getItem("pdp_outcomes") || [],
  pdp_outputs: [], //  localStorage.getItem("pdp_outputs") || [],
  permissions: [], // localStorage.getItem("permissions") || [],
  pip_types: [], // localStorage.getItem("pip_types") || [],
  preparation_documents: [], // localStorage.getItem("preparation_documents") || [],
  prexc_activities: [], // localStorage.getItem('prexc_activities') || [],
  programming_documents: [], // localStorage.getItem("programming_documents") || [],
  provinces: [], // localStorage.getItem("provinces") || [],
  regions: [], //  localStorage.getItem("regions") || [],
  roles: [], // localStorage.getItem("roles") || [],
  spatial_coverages: [], // localStorage.getItem("spatial_coverages") || [],
  sustainable_development_goals: [], // localStorage.getItem("sustainable_development_goals") || [],
  ten_point_agenda: [], //  localStorage.getItem("ten_point_agenda") || []
  pdp_chapter: null
};

const mutations = {


  setPdpOutcomes(state, value) {
    state.pdp_outcomes = value;
  },
  setPdpOutputs(state, value) {
    state.pdp_outputs = value;
  },
  setPipTypes(state, value) {
    state.pip_types = value;
  },
  setPreparationDocuments(state, value) {
    state.preparation_documents = value;
  },
  setPrexcActivities(state, value) {
    state.prexc_activities = value;
  },
  setProgrammingDocuments(state, value) {
    state.programming_documents = value;
  },
  setProvinces(state, value) {
    state.provinces = value;
  },
  setRegions(state, value) {
    state.regions = value;
  },
  setSpatialCoverages(state, value) {
    state.spatial_coverages = value;
  },
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
  loadPdpOutcomes({ commit }) {
    axiosInstance
      .get("/pdp_outcomes")
      .then(res => {
        localStorage.setItem("pdp_outcomes", JSON.stringify(res.data));
        commit("setPdpOutcomes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPdpOutputs({ commit }) {
    axiosInstance
      .get("/pdp_outputs")
      .then(res => {
        localStorage.setItem("pdp_outputs", JSON.stringify(res.data));
        commit("setPdpOutputs", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPipTypes({ commit }) {
    axiosInstance
      .get("/pip_types")
      .then(res => {
        localStorage.setItem("pip_types", JSON.stringify(res.data));
        commit("setPipTypes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPreparationDocuments({ commit }) {
    axiosInstance
      .get("/preparation_documents")
      .then(res => {
        localStorage.setItem("preparation_documents", JSON.stringify(res.data));
        commit("setPreparationDocuments", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPrexcActivities({ commit }) {
    axiosInstance
      .get("/prexc_activities")
      .then(res => {
        localStorage.setItem("prexc_activities", JSON.stringify(res.data));
        commit("setPrexcActivities", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadProgrammingDocuments({ commit }) {
    axiosInstance
      .get("/programming_documents")
      .then(res => {
        localStorage.setItem("programming_documents", JSON.stringify(res.data));
        commit("setProgrammingDocuments", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadProvinces({ commit }) {
    axiosInstance
      .get("/provinces")
      .then(res => {
        localStorage.setItem("provinces", JSON.stringify(res.data));
        commit("setProvinces", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadRegions({ commit }) {
    axiosInstance
      .get("/regions")
      .then(res => {
        localStorage.setItem("regions", JSON.stringify(res.data));
        commit("setRegions", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadSpatialCoverages({ commit }) {
    axiosInstance
      .get("/spatial_coverages")
      .then(res => {
        localStorage.setItem("spatial_coverages", JSON.stringify(res.data));
        commit("setSpatialCoverages", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
