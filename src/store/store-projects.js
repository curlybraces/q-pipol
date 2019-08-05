import { axiosInstance } from "boot/axios";
import { Loading } from "quasar";

const state = {
  project: {},
  projects: [],
  search: ""
};

const mutations = {
  setProjects(state, value) {
    state.projects = value;
  },
  setProject(state, value) {
    state.project = value;
  },
  setSearch(state, value) {
    state.search = value;
  }
};

const actions = {
  loadProjects({ commit }) {
    axiosInstance
      .get("/projects")
      .then(res => {
        commit("setProjects", res.data);
      })
      .catch(e => {
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
    // call axios here for deleting projects based on id
    dispatch("loadProjects"); // reload projects after delete
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
