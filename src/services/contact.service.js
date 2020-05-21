import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import { FETCH_OPERATING_UNITS } from '@/graphql/queries';

export const contactService = {
  index() {
    return client
      .query({
        query: FETCH_OPERATING_UNITS
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
