import Vue from "vue";

export function addProject(state, payload) {
  Vue.set(state.projects, payload.id, payload.project);
}

export function updateProject(state, payload) {
  Object.assign(state.projects[payload.id], payload.updates);
}

export function deleteProject(state, id) {
  Vue.delete(state.projects, id);
}

export function setSearch(state, value) {
  state.search = value;
}

export function setProjectsDownloaded(state, value) {
  state.projectsDownloaded = value;
}
