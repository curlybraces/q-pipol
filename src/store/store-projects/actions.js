import { apolloClient } from 'boot/apollo';
import {
  ALL_PROJECTS_QUERY,
  DELETE_PROJECT_MUTATION
} from '../../constants/graphql';
import { Notify } from 'quasar';

export function fetchProjects({ commit }, payload) {
  const { first, after } = payload;

  commit('SET_LOADING', true);

  return apolloClient
    .query({
      query: ALL_PROJECTS_QUERY,
      variables: {
        first: first,
        after: after
      }
    })
    .then(res => {
      res.data.projects.edges.forEach(edge => {
        const payload = {
          id: 'ID' + edge.node.id,
          project: edge.node
        };
        commit('ADD_PROJECT', payload);
      });

      commit('SET_PAGE_INFO', res.data.projects.pageInfo);
      commit('SET_LOADING', false);

      return;
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
      }
    })
    .then(data => {
      if (!data.data.deleteProject) {
        console.log('Project was already deleted.');
      } else {
        commit('DELETE_PROJECT', id);
        Notify.create('Project successfully deleted.');
      }
    })
    .catch(err => {
      alert(err.message);
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
