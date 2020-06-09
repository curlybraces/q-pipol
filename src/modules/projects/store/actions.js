import { projectService } from '@/services';

export function fetchProjects({}, payload) {
  return projectService.index(payload);
}

export function createProject({}, payload) {
	return projectService.create(payload)
}

export function deleteProject({}, payload) {
  return projectService.delete(payload);
}

export function reviewProject({}, payload) {
  return projectService.review(payload);
}

export function viewProject({}, payload) {
  return projectService.view(payload);
}

export function selectProject({ commit }, payload) {
  commit('SELECT_PROJECT', payload);
}

export function removeProject({ commit }, payload) {
  commit('REMOVE_PROJECT', payload);
}

export function endorseProjects({}, payload) {
  return projectService.endorse(payload);
}
