export function projects(state, getters) {
  const projects = getters.projectsFiltered;
  if (projects) {
    return projects;
  }
  return state.projects;
}

export function projectsFiltered(state) {
  // initiate empty object for filtered projects
  let projectsFiltered = {};

  // check if state.search is not empty
  if (state.search) {
    // change state.search to lowercase
    var searchLowerCase = state.search.toLowerCase();

    // loop through the objects to check if the title includes search term
    Object.keys(state.projects).forEach(key => {
      let project = projects[key];
      let projectTitleLowerCase = '';

      if (project.title !== 'undefined') {
        projectTitleLowerCase = project.title.toLowerCase();
      }

      // Add the project to projects filtered if title matches search
      if (projectTitleLowerCase.includes(searchLowerCase)) {
        projectsFiltered[key] = project;
      }
    });

    // return projectsFiltered
    return projectsFiltered;
  }

  return state.projects;
}

export function projectCount(state) {
  return Object.keys(state.projects).length;
}
