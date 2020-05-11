import { client } from '@/boot/apollo';
import {
  CREATE_RESOURCE_MUTATION,
  DELETE_RESOURCE_MUTATION
} from '../../../graphql/mutations';
import { FETCH_RESOURCES_QUERY } from '@/graphql/queries';
import {
  showErrorNotification,
  showSuccessNotification
} from '@/functions/function-show-notifications';

export function fetchResources({ commit }) {
  commit('SET_LOADING', true);

  return client
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

export function createResource({}, payload) {
  return client
    .mutate({
      mutation: CREATE_RESOURCE_MUTATION,
      variables: payload,
      update: (store, { data: { createResource } }) => {
        const data = store.readQuery({
          query: FETCH_RESOURCES_QUERY
        });

        data.resources.push(createResource);

        store.writeQuery({
          query: FETCH_RESOURCES_QUERY,
          data
        });

        console.log(store);
      }
    })
    .then(({ data }) => {
      console.log(data.createResource);

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
  return client
    .mutate({
      mutation: DELETE_RESOURCE_MUTATION,
      variables: {
        id: payload.id
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
