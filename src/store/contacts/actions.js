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

export function createContact({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: CREATE_CONTACT_MUTATION,
      variables: {
        name: payload.name,
        designation: payload.designation,
        operating_unit_id: payload.operating_unit_id,
        email: payload.email,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number
      }
    })
    .then(res => {
      const payload = {
        id: 'ID' + res.data.createContact.id,
        contact: res.data.createContact
      };

      showSuccessNotification({
        message: 'Successfully created contact.'
      });

      commit('ADD_CONTACT', payload);
      return;
    })
    .catch(err => console.log(err.message));
}

export function deleteContact({ commit }, id) {
  return apolloClient
    .mutate({
      mutation: DELETE_CONTACT_MUTATION,
      variables: {
        id: id
      }
    })
    .then(() => {
      showSuccessNotification({
        message: 'Successfully deleted contact.'
      });

      commit('DELETE_CONTACT', 'ID' + id);
      return;
    })
    .catch(err => console.log(err.message));
}

export function updateContact({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: UPDATE_CONTACT_MUTATION,
      variables: {
        id: payload.id,
        name: payload.name,
        designation: payload.designation,
        operating_unit_id: payload.operating_unit_id,
        email: payload.email,
        phone_number: payload.phone_number,
        fax_number: payload.fax_number
      }
    })
    .then(() => {
      const updatedContact = {
        payload: 'ID' + payload.id,
        contact: payload
      };

      showSuccessNotification({
        message: 'Successfully updated contact.'
      });

      commit('UPDATE_CONTACT', updatedContact);
      return;
    })
    .catch(err => console.log(err.message));
}

export function setSearch({ commit }, value) {
  commit('SET_SEARCH', value);
}
