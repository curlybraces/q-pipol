import { firebaseAuth } from "boot/firebase";

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
    // projectsFiltered = state.projects.filter(project => {
    projectsFiltered = projectsSorted.filter(project => {
      return (
        project.title.toLowerCase().includes(searchLowerCase) ||
        project.description.toLowerCase().includes(searchLowerCase)
      );
    });
    return projectsFiltered;
  }
  return projectsSorted;
}

export function projectsSorted(state, getters, rootState) {
  let projectsSorted = [],
    showAll = rootState.settings.showAll;

  if (!showAll) {
    let projects = getters.myProjects;
    projectsSorted = projects.sort((a, b) => {
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
  } else {
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
  }

  return projectsSorted;
}

export function myProjects(state) {
  let myProjects = [],
    userId = null;

  userId = firebaseAuth.currentUser.uid;

  myProjects = [...state.projects].filter(project => {
    return project.addedBy == userId;
  });

  return myProjects;
}
