import { axiosInstance } from "boot/axios";
import { Loading, QSpinnerFacebook } from 'quasar';

const state = {
  project: {},
  projects: [],
  filteredProjects: [],
  search: ''
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
  },
  setFilteredProjects(state, value) {
    state.filteredProjects = value;
  }
};

const actions = {
  loadProjects( { commit } ) {
    axiosInstance
      .get("/projects")
      .then(res => {
        commit('setProjects',res.data.data)
      })
      .catch(e => {
        console.log('Error: ',e.message)
      });
  },
  loadProject( { commit }, payload) {
    Loading.show({
      spinner: QSpinnerFacebook,
      message: "Logging in..."
    });
    axiosInstance
      .get("/projects/" + payload.id)
      .then(res => {
        Loading.hide();
        commit('setProject', res.data);
      })
      .catch(e => {
        console.log('Error: ', e.message);
      });
  },
  setSearch( { commit }, value) {
    commit('setSearch', value);
  }
};

const getters = {
  project: (state) => {
    return state.project;
  },
  projects: (state, getters) => {
    var projects = getters.projectsFiltered;
    return projects;
  },
  projectsFiltered: (state) => {
    let filteredProjects = [];
    if (state.search) {
      console.log(state.search);
      state.projects.filter(function(project) {
        return project.title.toLowerCase().includes(state.search.toLowerCase());
      });
      console.log(filteredProjects);
    } else {
      return state.projects;
    }
    console.log(filteredProjects)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
