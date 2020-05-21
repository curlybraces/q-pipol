import { client } from '@/boot/apollo';
import {
  CREATE_CONTACT_MUTATION,
  UPDATE_CONTACT_MUTATION,
  DELETE_CONTACT_MUTATION,
  UPDATE_OPERATING_UNIT_MUTATION,
  UPDATE_OPERATING_UNIT_IMAGE
} from '@/graphql/mutations';
import { FETCH_CONTACTS } from '@/graphql/queries';
import { showSuccessNotification } from '@/functions/function-show-notifications';

import { contactService } from '@/services/contact.service';

export function fetchContacts({}) {
  return contactService.index();
}

export function createContact({}, payload) {
  client
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
    .then(() => {
      showSuccessNotification({
        message: 'Successfully created contact.'
      });
    })
    .catch(err => console.log(err.message));
}

/* Delete contact */
export function deleteContact({}, id) {
  client
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
    .then(() => {
      showSuccessNotification({
        message: 'Successfully deleted contact.'
      });
    })
    .catch(err => console.log(err.message));
}

export function updateContact({}, payload) {
  client
    .mutate({
      mutation: UPDATE_CONTACT_MUTATION,
      variables: payload
    })
    .then(() => {
      showSuccessNotification({
        message: 'Successfully updated contact.'
      });
    })
    .catch(err => console.log(err.message));
}

export function updateOperatingUnitImage({}, payload) {
  return client
    .mutate({
      mutation: UPDATE_OPERATING_UNIT_IMAGE,
      variables: payload
    })
    .then(() => {
      showSuccessNotification({
        message: 'Successfully changed operating unit image.'
      });
      return;
    })
    .catch(err => {
      console.log(err);
      return;
    });
}

export function updateOperatingUnit({}, payload) {
  return client
    .mutate({
      mutation: UPDATE_OPERATING_UNIT_MUTATION,
      variables: payload
    })
    .then(({ data }) => {
      showSuccessNotification({
        message: 'Successfully updated: ' + data.updateOperatingUnit.acronym
      });
    })
    .catch(err => console.log(err.message));
}

export function setSearch({ commit }, value) {
  commit('SET_SEARCH', value);
}
