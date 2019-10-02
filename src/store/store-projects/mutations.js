export function addProject(state, payload) {
  state.projects.push(payload);
}

export function updateProject(state, payload) {
  // Object.assign(state.projects[payload.id], payload.project);
  state.projects.filter(project => {
    return project.id != payload.id;
  });
  state.projects.push(payload.project);
}

export function deleteProject(state, id) {
  state.projects = state.projects.filter(project => {
    return project.id != id;
  });
}

export function setSearch(state, value) {
  state.search = value;
}

export function setProject(state, value) {
  state.project = value;
}

export function setProjectsDownloaded(state, value) {
  state.projectsDownloaded = value;
}

export function setProjectStatus(state, payload) {
  let projectIndex = state.projects.findIndex(project => {
    return project.id == payload.id;
  });
  state.projects.splice(projectIndex, 1);
}

export function clearProjects(state) {
  state.projects = [];
}
