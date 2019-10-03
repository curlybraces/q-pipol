export function addProject(state, payload) {
  state.projects.push(payload);
}

export function updateProject(state, payload) {
  console.log(payload.project)
  let projectIndex = state.projects.findIndex(project => {
    return project.id == payload.id;
  });
  state.projects.splice(projectIndex, 1, payload.project);
}

export function deleteProject(state, id) {
  let projectIndex = state.projects.findIndex(project => {
    return project.id == id;
  });
  state.projects.splice(projectIndex, 1);
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
