import { client } from 'boot/apollo';
import {
  FETCH_VERSIONS,
  FETCH_VERSION,
  CURRENT_VERSION
} from '@/graphql/queries';
import {
  CREATE_VERSION,
  UPDATE_VERSION,
  DELETE_VERSION
} from '@/graphql/mutations';
import { handleResponse, handleError } from '@/utils';

export const versionService = {
  index() {
    return client
      .query({
        query: FETCH_VERSIONS
      })
      .then(handleResponse)
      .catch(handleError);
  },
  get(id) {
    return client
      .query({
        query: FETCH_VERSION,
        variables: {
          id: id
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  getCurrentVersion() {
    return client
      .query({
        query: CURRENT_VERSION
      })
      .then(handleResponse)
      .catch(handleError);
  },
  create(payload) {
    return client
      .mutate({
        mutation: CREATE_VERSION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  update(payload) {
    return client
      .mutate({
        mutation: UPDATE_VERSION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  delete(id) {
    return client
      .mutate({
        mutation: DELETE_VERSION,
        variables: {
          id: id
        }
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
