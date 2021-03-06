import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import {
  SEARCH_PROJECTS,
  FETCH_PROJECT_QUERY,
  PAGINATED_PROJECTS
} from '@/graphql/queries';
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  REVIEW_PROJECT_MUTATION,
  ENDORSE_PROJECTS_MUTATION,
  CREATE_GAD_FORM,
  UPDATE_PROJECT_MUTATION,
  PROCESS_PROJECT_MUTATION,
  VALIDATE_PROJECT_MUTATION,
  RETURN_PROJECT_MUTATION
} from '@/graphql/mutations';

export const projectService = {
  index(payload) {
    console.log(payload);
    return client
      .query({
        query: PAGINATED_PROJECTS,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  show(payload) {
    // get based on id
    return client
      .query({
        query: FETCH_PROJECT_QUERY,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  search(payload) {
    return client
      .query({
        query: SEARCH_PROJECTS,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  create(payload) {
    return client
      .mutate({
        mutation: CREATE_PROJECT_MUTATION,
        variables: payload,
        update: (cache, { data: { createProject } }) => {
          console.log('created project: ', createProject);

          const data = cache.readQuery({
            query: PAGINATED_PROJECTS,
            variables: {
              first: 10,
              page: 1
            }
          });

          console.log('paginatedProjects: ', data.paginatedProjects);

          const newNode = {
            node: createProject,
            __typename: 'Project'
          };

          console.log('newNode: ', newNode);

          data.paginatedProjects.data.unshift(newNode);

          console.log('data with the newNode: ', data);

          cache.writeQuery({
            query: PAGINATED_PROJECTS,
            variables: {
              first: 10,
              page: 1
            },
            data
          });

          console.log('cache: ', cache);
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  delete(payload) {
    return client
      .mutate({
        mutation: DELETE_PROJECT_MUTATION,
        variables: payload,
        update: (store, { data: { deleteProject } }) => {
          // assigned the deleted id to target id and return id
          const deletedId = deleteProject ? deleteProject.id : payload.id;

          // retrieve the paginated query
          // variables are required
          const data = store.readQuery({
            query: PAGINATED_PROJECTS,
            variables: {
              page: 1,
              first: 10
            }
          });

          console.log('is store being run?');

          // filter out the deleted id from the list
          data.paginatedProjects.data = data.paginatedProjects.data.filter(
            project => project.id !== deletedId
          );

          // save the query
          store.writeQuery({
            query: PAGINATED_PROJECTS,
            variables: {
              page: 1,
              first: 10
            },
            data
          });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          deleteProject: {
            id: payload.id,
            title: '',
            __typename: 'Project'
          }
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  review(payload) {
    return client
      .mutate({
        mutation: REVIEW_PROJECT_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  endorse(payload) {
    return client
      .mutate({
        mutation: ENDORSE_PROJECTS_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  update(payload) {
    return client
      .mutate({
        mutation: UPDATE_PROJECT_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  finalize(payload) {
    return client
      .mutate({
        mutation: PROCESS_PROJECT_MUTATION,
        variables: payload
      })
      .then(({ data }) => console.log(data))
      .catch(err => console.error(err));
  },
  uploadGad({ project_id, gad_form }) {
    return client
      .mutate({
        mutation: CREATE_GAD_FORM,
        variables: {
          project_id: project_id,
          gad_form: gad_form
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  validate(payload) {
    return client
      .mutation({
        mutation: VALIDATE_PROJECT_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  return(payload) {
    return client
      .mutation({
        mutation: RETURN_PROJECT_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
