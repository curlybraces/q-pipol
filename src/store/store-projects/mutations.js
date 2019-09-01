import Vue from "vue";

export function addProject(state, payload) {
  state.projects.push(payload);
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

export function clearProjects(state) {
  state.projects = {};
}
