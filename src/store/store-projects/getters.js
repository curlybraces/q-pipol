export function projects(state, getters) {
  var projects = getters.projectsFiltered;
  if (projects) {
    return projects;
  }
  return state.projects;
}

export function projectsFiltered(state, getters) {
  // initiate empty object for filtered projects
  let projectsFiltered = {},
    projectsSorted = getters.projectsSorted;

  // check if state.search is not empty
  if (state.search) {
    // change state.search to lowercase
    var searchLowerCase = state.search.toLowerCase();

    // loop through the objects to check if the title includes search term
    Object.keys(projectsSorted).forEach(key => {
      let project = projectsSorted[key];
      let projectTitleLowerCase = project.title.toLowerCase();

      // Add the project to projects filtered if title matches search
      if (projectTitleLowerCase.includes(searchLowerCase)) {
        projectsFiltered[key] = project;
      }
    });
    // return projectsFiltered
    return projectsFiltered;
  }

  return projectsSorted;
}

export function projectsSorted(state) {
  let projectsSorted = {},
    keysOrdered = Object.keys(state.projects);

  const direction = state.direction ? state.direction: 'asc';
  const sort = state.sort ? state.sort: 'title';

  // run sort once loading is completed
  if (!state.loading) {
    keysOrdered.sort((a,b) => {
      let projectAProp = (sort !== 'total_project_cost') ? state.projects[a][sort].toLowerCase(): state.projects[a][sort],
          projectBProp = (sort !== 'total_project_cost') ? state.projects[b][sort].toLowerCase(): state.projects[b][sort];

      // order based on prop
      if (direction == 'asc') {
        if (projectAProp > projectBProp) {
          return 1
        } else if (projectAProp < projectBProp) {
          return -1
        } else {
          return 0
        }
      } else {
        if (projectAProp > projectBProp) {
          return -1
        } else if (projectAProp < projectBProp) {
          return 1
        } else {
          return 0
        }
      }

    });

    keysOrdered.forEach((key) => {
      projectsSorted[key] = state.projects[key];
    });

  } else {
    return {};
  }

  return projectsSorted;
}
