import Vue from 'vue';

export function ADD_PROJECT(state, payload) {
  Vue.set(state.projects, payload.id, payload.project);
}

export function updateProject(state, payload) {
  let projectIndex = state.projects.findIndex(project => {
    return project.id == payload.id;
  });
  state.projects.splice(projectIndex, 1, payload.project);
}

export function DELETE_PROJECT(state, id) {
  Vue.delete(state.projects, id);
}

export function SET_SEARCH(state, value) {
  state.search = value;
}

export function setProjectsDownloaded(state, value) {
  state.projectsDownloaded = value;
}

export function CLEAR_PROJECTS(state) {
  state.projects = {};
}

export function SET_LOADING(state, value) {
  state.loading = value;
}

export function SET_PAGE_INFO(state, value) {
  state.pageInfo = value;
}

export function SET_DIRECTION(state, value) {
  state.direction = value;
}

export function SET_SORT(state, value) {
  state.sort = value;
}
