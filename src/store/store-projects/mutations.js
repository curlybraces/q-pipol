export function addProject(state, payload) {
  state.projects.push(payload);
}

export function updateProject(state, payload) {
  // Object.assign(state.projects[payload.id], payload);
  state.projects.filter(project => {
    return project.id != payload.id;
  });
  state.projects.push(payload);
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

export function clearProjects(state) {
  state.projects = [];
}
