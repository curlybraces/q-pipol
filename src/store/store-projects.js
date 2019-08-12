import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";

const state = {
  project: {},
  projects: [],
  deletedProjects: [],
  search: ""
};

const mutations = {
  setProjects(state, value) {
    state.projects = value;
  },
  setProject(state, value) {
    state.project = value;
  },
  setDeletedProjects(state, value) {
    state.deletedProjects = value;
  },
  setSearch(state, value) {
    state.search = value;
  },
  setSpatialCoverage(state, value) {
    state.project.spatial_coverage_id = value;
  },
  setRegions(state, value) {
    state.project.regions = value;
  },
  setPipType(state, value) {
    state.project.pip_type_id = value;
  },
  setCipType(state, value) {
    state.project.cip_type_id = value;
  },
  setTrip(state, value) {
    state.project.trip = value;
  },
  setRdip(state, value) {
    state.project.rdip = value;
  }
};

const actions = {
  loadProjects({ commit }) {
    Loading.show();
    axiosInstance
      .get("/projects")
      .then(res => {
        commit("setProjects", res.data.data);
        Loading.hide();
      })
      .catch(e => {
        Loading.hide();
        console.log("Error: ", e.message);
      });
  },
  loadProject({ commit }, payload) {
    Loading.show();
    axiosInstance
      .get("/projects/" + payload.id)
      .then(res => {
        Loading.hide();
        commit("setProject", res.data);
      })
      .catch(e => {
        console.log("Error: ", e.message);
      });
  },
  deleteProject({ dispatch }, payload) {
    console.log("deleting project: ", payload.id);

    axiosInstance
      .delete("/projects/" + payload.id)
      .then(res => {
        console.log(res.data);

        dispatch("loadProjects");
      })
      .catch(e => {
        console.log(e.message);
      });
    // call axios here for deleting projects based on id
  },
  loadDeletedProjects({ commit }) {
    axiosInstance
      .get("/projects/deleted")
      .then(res => {
        commit("setDeletedProjects", res.data);
      })
      .catch(e => {
        console.log(e.message);
      });
  },
  setSearch({ commit }, value) {
    commit("setSearch", value);
  }
};

const getters = {
  project: state => {
    return state.project;
  },
  projects: (state, getters) => {
    var projects = getters.projectsFiltered;
    if (projects) {
      return projects;
    }
    return state.projects;
  },
  projectsFiltered: state => {
    if (state.search) {
      var searchLowerCase = state.search.toLowerCase();
      // return items that contain. need two returns.
      return state.projects.filter(project => {
        return (
          project.title.toLowerCase().includes(searchLowerCase) ||
          project.description.toLowerCase().includes(searchLowerCase)
        );
      });
    }
    return state.projects;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
