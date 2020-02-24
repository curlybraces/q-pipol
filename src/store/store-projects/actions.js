import { apolloClient } from "boot/apollo";
import { DELETE_PROJECT_MUTATION } from "../../constants/graphql";

export function deleteProject({}, id) {
  console.log(id);
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
