import { apolloClient } from '../../boot/apollo';
import {
  CREATE_CONTACT_MUTATION,
  UPDATE_CONTACT_MUTATION,
  DELETE_CONTACT_MUTATION
} from '../../graphql/mutations';
import { FETCH_CONTACTS } from '../../graphql/queries';
import { showSuccessNotification } from '../../functions/function-show-notifications';

export function fetchContacts({ commit }) {
  commit('SET_LOADING', true);
  apolloClient
    .query({
      query: FETCH_CONTACTS
    })
    .then(res => {
      res.data.contacts.forEach(contact => {
        const payload = {
          id: 'ID' + contact.id,
          contact: contact
        };
        commit('ADD_CONTACT', payload);
      });
      commit('SET_LOADING', false);
    })
    .catch(err => {
      console.log('An error occurred: ', err);
      commit('SET_ERROR', true);
      commit('SET_LOADING', false);
    });
}

export function createContact({}, payload) {
  apolloClient
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
  apolloClient
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
  apolloClient
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

export function setSearch({ commit }, value) {
  commit('SET_SEARCH', value);
}
