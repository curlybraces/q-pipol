import { apolloClient } from 'boot/apollo-boost';
import { DELETE_PROJECT_MUTATION } from '../../graphql/mutations';
import { GET_PROJECTS, RELAY_PROJECTS_QUERY } from '../../graphql/queries';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../functions/function-show-notifications';

export function fetchProjects({ commit }) {
  commit('SET_LOADING', true);

  apolloClient
    .query({
      query: GET_PROJECTS
    })
    .then(({ data }) => {
      commit('SET_PROJECTS', data.projects);
      commit('SET_LOADING', false);
    })
    .catch(err => {
      alert(err.message);
    });
}

export function deleteProject({}, id) {
  apolloClient
    .mutate({
      mutation: DELETE_PROJECT_MUTATION,
      variables: {
        id: id
      },
      update: (store, { data: { deleteProject } }) => {
        // assigned the deleted id to target id and return id
        const deletedId = deleteProject ? deleteProject.id : id;

        // retrieve the paginated query
        // variables are required
        const data = store.readQuery({
          query: RELAY_PROJECTS_QUERY,
          variables: {
            after: '',
            first: 10
          }
        });

        // this is retrieved from cache; thus, the problem
        console.log(data.relayProjects.pageInfo);

        // filter out the deleted id from the list
        data.relayProjects.edges = data.relayProjects.edges.filter(
          edge => edge.node.id !== deletedId
        );

        // save the query
        store.writeQuery({
          query: RELAY_PROJECTS_QUERY,
          variables: {
            after: '',
            first: 10
          },
          data
        });
      }
    })
    .then(data => {
      // if the project is not present in the database anymore, notify that the project was already deleted
      // else notify user of the successful operation
      if (!data.data.deleteProject) {
        showSuccessNotification({
          message: 'Project was already deleted from the database.'
        });
      } else {
        showSuccessNotification({
          message: 'Project successfully deleted.'
        });
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}

export function setSearch({ commit }, value) {
  commit('SET_SEARCH', value);
}

export function setDirection({ commit }, value) {
  commit('SET_DIRECTION', value);
}

export function setSort({ commit }, value) {
  commit('SET_SORT', value);
}
