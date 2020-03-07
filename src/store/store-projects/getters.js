export function projects(state, getters) {
  var projects = getters.projectsFiltered;
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
      let project = state.projects[key];
      let projectTitleLowerCase = project.title.toLowerCase();

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

// export function projectsSorted(state) {
//   let projectsSorted = [];
//
//   projectsSorted = [...state.projects].sort((a, b) => {
//     let aProp = a[state.sort].toLowerCase(),
//       bProp = b[state.sort].toLowerCase();
//     if (aProp > bProp) {
//       return 1;
//     } else if (aProp < bProp) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
//
//   return projectsSorted;
// }
