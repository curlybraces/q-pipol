export function projects(state, getters) {
  var projects = getters.projectsFiltered;
  if (projects) {
    return projects;
  }
  return state.projects;
}

export function projectsFiltered(state) {
  if (state.search) {
    var searchLowerCase = state.search.toLowerCase();
    // return items that contain. need two returns.
    return state.projects.filter(project => {
      return (
        project.title.toLowerCase().includes(searchLowerCase) ||
        project.description.toLowerCase().includes(searchLowerCase)
      );
    });
  }
  return state.projects;
}
