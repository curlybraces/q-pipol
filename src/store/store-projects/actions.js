import { apolloClient } from "boot/apollo";
import { ALL_PROJECTS_QUERY, DELETE_PROJECT_MUTATION } from "../../constants/graphql";

export  function fetchProjects({commit}, page = 1) {
  commit("SET_LOADING",true);
  apolloClient.query({
    query: ALL_PROJECTS_QUERY,
    variables: {
      page: page
    }
  })
    .then(res => {
      commit("SET_PROJECTS",res.data.projects.data);
      commit("SET_PAGINATOR_INFO",res.data.projects.paginatorInfo);
      commit("SET_LOADING",false);
    });
}

export function deleteProject({}, id) {
  apolloClient
    .mutate({
      mutation: DELETE_PROJECT_MUTATION,
      variables: {
        id: id
      }
    })
    .then(data => {
      if (!data.data.deleteProject) {
        console.log("Project was already deleted.");
      } else {
        console.log("Project successfully deleted.");
      }
    });
}

export function setSearch({ commit }, value) {
  commit("setSearch", value);
}
