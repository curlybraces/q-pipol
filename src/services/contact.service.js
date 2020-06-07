import { client } from '@/boot/apollo';
import { handleResponse, handleError } from '@/utils';

import { FETCH_OPERATING_UNITS, FETCH_CONTACTS } from '@/graphql/queries';
import {
  CREATE_CONTACT_MUTATION,
  UPDATE_OPERATING_UNIT_MUTATION,
  DELETE_CONTACT_MUTATION
} from '@/graphql/mutations';

export const contactService = {
  index() {
    return client
      .query({
        query: FETCH_OPERATING_UNITS
      })
      .then(handleResponse)
      .catch(handleError);
  },
  create(payload) {
    return client
      .mutate({
        mutation: CREATE_CONTACT_MUTATION,
        variables: payload,
        update: (store, { data: { createContact } }) => {
          console.log('store', store);
          console.log('createContact', createContact);

          const data = store.readQuery({ query: FETCH_CONTACTS });

          store.writeQuery({
            query: FETCH_CONTACTS,
            data: {
              ...data,
              contacts: [...data.contacts, createContact]
            }
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  },
  update(payload) {
    return client
      .mutate({
        mutation: UPDATE_OPERATING_UNIT_MUTATION,
        variables: payload
      })
      .then(handleResponse)
      .catch(handleError);
  },
  delete(id) {
    return client
      .mutate({
        mutation: DELETE_CONTACT_MUTATION,
        variables: {
          id: id
        },
        update: (store, { data: { deleteContact } }) => {
          const data = store.readQuery({
            query: FETCH_CONTACTS
          });

          data.contacts = data.contacts.filter(c => c.id !== deleteContact.id);

          store.writeQuery({
            query: FETCH_CONTACTS,
            data
          });
        }
      })
      .then(handleResponse)
      .catch(handleError);
  }
};
