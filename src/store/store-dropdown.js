import { axiosInstance } from "boot/axios";

const state = {
  approval_levels: [], // localStorage.getItem("approval_levels") || [],
  categorizations: [], // localStorage.getItem("categorizations") || [],
  cip_types: [], // localStorage.getItem("cip_types") || [],
  city_municipalities: [], //  localStorage.getItem("city_municipalities") || [],
  contact_types: [], // localStorage.getItem("contact_types") || [],
  funding_institutions: [], // localStorage.getItem("funding_institutions") || [],
  funding_sources: [], // localStorage.getItem("funding_sources") || [],
  gad_readinesses: [], // localStorage.getItem("gad_readinesses") || [],
  implementation_bases: [], // localStorage.getItem("implementation_bases") || [],
  implementation_modes: [], // localStorage.getItem("implementation_modes") || [],
  implementation_periods: [], // localStorage.getItem("implementation_periods") || [],
  implementation_readinesses: [], // localStorage.getItem("implementation_readinesses") || [],
  infrastructure_sectors: [], // localStorage.getItem("infrastructure_sectors") || [],
  infrastructure_subsectors: [], // localStorage.getItem("infrastructure_subsectors") || [],
  operating_units: [], // localStorage.getItem("operating_units") || [],
  pap_types: [], // localStorage.getItem("pap_types") || [],
  pdp_chapters: [], // localStorage.getItem("pdp_chapters") || [],
  pdp_indicators: [], // localStorage.getItem("pdp_indicators") || [],
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
  setApprovalLevels(state, value) {
    state.approval_levels = value;
  },
  setCategorizations(state, value) {
    state.categorizations = value;
  },
  setCipTypes(state, value) {
    state.cip_types = value;
  },
  setCityMunicipalities(state, value) {
    state.city_municipalities = value;
  },
  setContactTypes(state, value) {
    state.contact_types = value;
  },
  setFundingInstitutions(state, value) {
    state.funding_institutions = value;
  },
  setFundingSources(state, value) {
    state.funding_sources = value;
  },
  setGadReadinesses(state, value) {
    state.gad_readinesses = value;
  },
  setImplementationBases(state, value) {
    state.implementation_bases = value;
  },
  setImplementationModes(state, value) {
    state.implementation_modes = value;
  },
  setImplementationPeriods(state, value) {
    state.implementation_periods = value;
  },
  setImplementationReadinesses(state, value) {
    state.implementation_readinesses = value;
  },
  setInfrastructureSectors(state, value) {
    state.infrastructure_sectors = value;
  },
  setInfrastructureSubsectors(state, value) {
    state.infrastructure_subsectors = value;
  },
  setOperatingUnits(state, value) {
    state.operating_units = value;
  },
  setPapTypes(state, value) {
    state.pap_types = value;
  },
  setPdpChapters(state, value) {
    state.pdp_chapters = value;
  },
  setPdpIndicators(state, value) {
    state.pdp_indicators = value;
  },
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
  loadApprovalLevels({ commit }) {
    axiosInstance
      .get("/approval_levels")
      .then(res => {
        localStorage.setItem("approval_levels", JSON.stringify(res.data));
        commit("setApprovalLevels", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
  loadCipTypes({ commit }) {
    axiosInstance
      .get("/cip_types")
      .then(res => {
        localStorage.setItem("cip_types", JSON.stringify(res.data));
        commit("setCipTypes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadCityMunicipalities({ commit }) {
    axiosInstance
      .get("/city_municipalities")
      .then(res => {
        localStorage.setItem("city_municipalities", JSON.stringify(res.data));
        commit("setCityMunicipalities", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadContactTypes({ commit }) {
    axiosInstance
      .get("/contact_types")
      .then(res => {
        localStorage.setItem("contact_types", JSON.stringify(res.data));
        commit("setContactTypes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
  },
  loadFundingSources({ commit }) {
    axiosInstance
      .get("/funding_sources")
      .then(res => {
        localStorage.setItem("funding_sources", JSON.stringify(res.data));
        commit("setFundingSources", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadGadReadinesses({ commit }) {
    axiosInstance
      .get("/gad_readinesses")
      .then(res => {
        localStorage.setItem("gad_readinesses", JSON.stringify(res.data));
        commit("setGadReadinesses", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadImplementationBases({ commit }) {
    axiosInstance
      .get("/implementation_bases")
      .then(res => {
        localStorage.setItem("implementation_bases", JSON.stringify(res.data));
        commit("setImplementationBases", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadImplementationModes({ commit }) {
    axiosInstance
      .get("/implementation_modes")
      .then(res => {
        localStorage.setItem("implementation_modes", JSON.stringify(res.data));
        commit("setImplementationModes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadImplementationPeriods({ commit }) {
    axiosInstance
      .get("/implementation_periods")
      .then(res => {
        localStorage.setItem(
          "implementation_periods",
          JSON.stringify(res.data)
        );
        commit("setImplementationPeriods", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadImplementationReadinesses({ commit }) {
    axiosInstance
      .get("/implementation_readinesses")
      .then(res => {
        localStorage.setItem(
          "implementation_readinesses",
          JSON.stringify(res.data)
        );
        commit("setImplementationReadinesses", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadInfrastructureSectors({ commit }) {
    axiosInstance
      .get("/infrastructure_sectors")
      .then(res => {
        localStorage.setItem(
          "infrastructure_sectors",
          JSON.stringify(res.data)
        );
        commit("setInfrastructureSectors", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadInfrastructureSubsectors({ commit }) {
    axiosInstance
      .get("/infrastructure_subsectors")
      .then(res => {
        localStorage.setItem(
          "infrastructure_subsectors",
          JSON.stringify(res.data)
        );
        commit("setInfrastructureSubsectors", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadOperatingUnits({ commit }) {
    axiosInstance
      .get("/operating_units")
      .then(res => {
        localStorage.setItem("operating_units", JSON.stringify(res.data));
        commit("setOperatingUnits", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPapTypes({ commit }) {
    axiosInstance
      .get("/pap_types")
      .then(res => {
        localStorage.setItem("pap_types", JSON.stringify(res.data));
        commit("setPapTypes", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPdpChapters({ commit }) {
    axiosInstance
      .get("/pdp_chapters")
      .then(res => {
        localStorage.setItem("pdp_chapters", JSON.stringify(res.data));
        commit("setPdpChapters", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  loadPdpIndicators({ commit }) {
    axiosInstance
      .get("/pdp_indicators")
      .then(res => {
        localStorage.setItem("pdp_indicators", JSON.stringify(res.data));
        commit("setPdpIndicators", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
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
