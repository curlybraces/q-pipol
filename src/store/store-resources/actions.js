import { apolloClient } from '../../boot/apollo';
import {
  CREATE_RESOURCE_MUTATION, DELETE_RESOURCE_MUTATION,
  FETCH_RESOURCES_QUERY
} from '../../constants/graphql';
import {
  showErrorNotification,
  showSuccessNotification
} from '../../functions/function-show-notifications';

export function fetchResources({ commit }) {
  commit('SET_LOADING', true);
  return apolloClient
    .query({
      query: FETCH_RESOURCES_QUERY
    })
    .then(res => {
      res.data.resources.forEach(resource => {
        const payload = {
          id: 'ID' + resource.id,
          resource: resource
        };
        commit('ADD_RESOURCE', payload);
      });
      commit('SET_LOADING', false);
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
      commit('SET_LOADING', false);
      commit('SET_ERROR', true);
    });
}

export function createResource({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: CREATE_RESOURCE_MUTATION,
      variables: {
        title: payload.title,
        description: payload.description,
        image_url: payload.image_url,
        url: payload.url,
        document_type: payload.document_type
      }
    })
    .then(res => {
      const resource = res.data.createResource;

      const payload = {
        id: 'ID' + resource.id,
        resource: resource
      };
      commit('ADD_RESOURCE', payload);

      showSuccessNotification({
        message: 'Successfully added resource.'
      });
    })
    .catch(err =>
      showErrorNotification({
        message: err.message
      })
    );
}

export function deleteResource({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: DELETE_RESOURCE_MUTATION,
      variables: {
        id: payload.id,
      }
    })
    .then(res => {
      const resource = res.data.deleteResource;

      const payload = {
        id: 'ID' + resource.id
      };

      commit('DELETE_RESOURCE', payload);

      showSuccessNotification({
        message: 'Successfully deleted resource.'
      });
    })
    .catch(err =>
      showErrorNotification({
        message: err.message
      })
    );
}
