import { apolloClient } from '../boot/apollo-boost-v2';
import { GET_PROJECTS } from '../graphql/queries';
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  FETCH_PROJECT_QUERY,
  UPDATE_PROJECT_MUTATION
} from '../graphql/mutations';

const projectsService = {
  get() {
    return apolloClient
      .query({
        query: GET_PROJECTS
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  create(payload) {
    return apolloClient
      .mutate({
        mutation: CREATE_PROJECT_MUTATION,
        variables: payload
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  read(payload) {
    return apolloClient
      .mutate({
        mutation: FETCH_PROJECT_QUERY,
        variables: {
          id: payload.id
        }
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  update(payload) {
    return apolloClient
      .mutate({
        mutation: UPDATE_PROJECT_MUTATION,
        variables: payload
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  },
  delete(payload) {
    return apolloClient
      .mutate({
        mutation: DELETE_PROJECT_MUTATION,
        variables: {
          id: payload.id
        }
      })
      .then(({ data }) => {
        return data;
      })
      .catch(err => {
        throw err;
      });
  }
};

export default projectsService;
