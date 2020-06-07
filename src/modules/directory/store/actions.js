import { client } from '@/boot/apollo';
import {
  UPDATE_OPERATING_UNIT_IMAGE,
  UPDATE_CONTACT_MUTATION
} from '@/graphql/mutations';
import { showSuccessNotification } from '@/functions/function-show-notifications';

import { contactService } from '@/services/contact.service';

export function fetchContacts({}) {
  return contactService.index();
}

export function createContact({}, payload) {
  return contactService.create(payload);
}

/* Delete contact */
export function deleteContact({}, id) {
  return contactService.delete(id);
}

export function updateContact({}, payload) {
  return client
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
  return contactService.update(payload);
}

export function setSearch({ commit }, value) {
  commit('SET_SEARCH', value);
}
