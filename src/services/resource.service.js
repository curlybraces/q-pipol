import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import { FETCH_RESOURCES_QUERY } from '@/graphql/queries';
import {
  CREATE_RESOURCE_MUTATION,
  DELETE_RESOURCE_MUTATION
} from '@/graphql/mutations';

export const resourceService = {
  index() {
    return client
      .query({
        query: FETCH_RESOURCES_QUERY
      })
      .then(handleResponse)
      .catch(handleError);
  },
  create({ title, description, url, image_url, document_type }) {
    return client
      .mutate({
        mutation: CREATE_RESOURCE_MUTATION,
        variables: {
          title: title,
          description: description,
          url: url,
          image_url: image_url,
          document_type: document_type
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  delete({ id }) {
    return client
      .mutate({
        mutation: DELETE_RESOURCE_MUTATION,
        variables: {
          id: id
        }
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
