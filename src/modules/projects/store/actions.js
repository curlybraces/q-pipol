import { projectService } from '@/services/project.service'

export function fetchProjects({}, payload) {
  console.log('fetchProjects triggered')
  return projectService.index(payload)
}

export function deleteProject({}, payload) {
  projectService.delete(payload)
}

export function reviewProject({}, payload) {
  projectService.review(payload)
}

export function viewProject({}, payload) {
  return projectService.view(payload)
}

export function selectProject({ commit }, payload) {
	commit('SELECT_PROJECT', payload)
}