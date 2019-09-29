export function projects(state, getters) {
  var projects = getters.projectsFiltered;
  if (projects) {
    return projects;
  }
  return state.projects;
}

export function projectsFiltered(state, getters) {
  let projectsSorted = getters.projectsSorted,
    projectsFiltered = [];
  if (state.search) {
    var searchLowerCase = state.search.toLowerCase();
    // return items that contain. need two returns.
    projectsFiltered = state.projects.filter(project => {
      return (
        project.title.toLowerCase().includes(searchLowerCase) ||
        project.description.toLowerCase().includes(searchLowerCase)
      );
    });
    return projectsFiltered;
  }
  return projectsSorted;
}

export function projectsSorted(state) {
  let projectsSorted = [];

  projectsSorted = [...state.projects].sort((a, b) => {
    let aProp = a[state.sort].toLowerCase(),
      bProp = b[state.sort].toLowerCase();
    if (aProp > bProp) {
      return 1;
    } else if (aProp < bProp) {
      return -1;
    } else {
      return 0;
    }
  });

  return projectsSorted;
}

export function newProjects(state, getters) {
  let newProjects = [],
    projects = getters.projectsFiltered;

  newProjects = projects.filter(project => {
    return (project.status == 'new' ||
      project.status == undefined)
  });

  return newProjects;
}

export function reviewedProjects(state, getters) {
  let reviewedProjects = [],
    projects = getters.projectsFiltered;

  reviewedProjects = projects.filter(project => {
    return project.status == 'reviewed'
  });

  return reviewedProjects;
}

export function finalizedProjects(state, getters) {
  let finalizedProjects = [],
    projects = getters.projectsFiltered;

  finalizedProjects = projects.filter(project => {
    return project.status == 'finalized'
  });

  return finalizedProjects;
}