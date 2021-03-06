import Vue from 'vue';

export function SET_PROJECTS(state, payload) {
  state.projects = payload;
}

export function SELECT_PROJECT(state, payload) {
  state.selectedProjects.push(payload);
}

export function REMOVE_PROJECT(state, payload) {
  state.selectedProjects = state.selectedProjects.filter(
    project => project.id !== payload.id
  );
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
