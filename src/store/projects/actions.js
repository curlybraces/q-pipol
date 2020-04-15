import { apolloClient } from 'boot/apollo-boost';
import { DELETE_PROJECT_MUTATION } from '../../graphql/mutations';
import { GET_PROJECTS } from '../../graphql/queries';
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

export function deleteProject({ commit }, id) {
  apolloClient
    .mutate({
      mutation: DELETE_PROJECT_MUTATION,
      variables: {
        id: id
      },
      update: (store, { data: { deleteProject } }) => {
        console.log('store: ', store);
        console.log('deleteProject', deleteProject);

        const data = store.readQuery({
          query: GET_PROJECTS
        });

        data.projects = data.projects.filter(p => p.id !== deleteProject.id);

        store.writeQuery({
          query: GET_PROJECTS,
          data
        });
      }
    })
    .then(data => {
      if (!data.data.deleteProject) {
        console.log('Project was already deleted.');
      } else {
        commit('DELETE_PROJECT', id);
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
