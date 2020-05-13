import { client } from '@/boot/apollo';
import { GET_PROJECTS, FETCH_PROJECT_QUERY } from '@/graphql/queries';
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION
} from '@/graphql/mutations';

const projectsService = {
  get() {
    return client
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
    return client
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
  read(id) {
    return client
      .mutate({
        mutation: FETCH_PROJECT_QUERY,
        variables: {
          id: id
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
    return client
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
  delete(id) {
    return client
      .mutate({
        mutation: DELETE_PROJECT_MUTATION,
        variables: {
          id: id
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
