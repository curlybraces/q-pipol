import { projectService } from '@/services';

export function fetchProjects({}, payload) {
  return projectService.index(payload);
}

export function viewProject({}, payload) {
  return projectService.view(payload);
}

export function createProject({}, payload) {
  return projectService.create(payload);
}

export function updateProject({}, payload) {
  return projectService.update(payload);
}

export function deleteProject({}, payload) {
  return projectService.delete(payload);
}

export function reviewProject({}, payload) {
  return projectService.review(payload);
}

export function endorseProjects({}, payload) {
  return projectService.endorse(payload);
}

export function finalizeProject({}, payload) {
  return projectService.finalize(payload);
}

export function selectProject({ commit }, payload) {
  commit('SELECT_PROJECT', payload);
}

export function removeProject({ commit }, payload) {
  commit('REMOVE_PROJECT', payload);
}

export function returnProject({}, payload) {
  return projectService.return(payload)
}

export function validateProject({}, payload) {
  return projectService.validate(payload)
}