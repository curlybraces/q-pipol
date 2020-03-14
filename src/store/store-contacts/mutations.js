import Vue from 'vue';

export function SET_CONTACTS(state, value) {
  state.contacts = value;
}

export function SET_LOADING(state, value) {
  state.loading = value;
}

export function SET_ERROR(state, value) {
  state.error = value;
}

export function SET_SEARCH(state, value) {
  state.search = value;
}

export function DELETE_CONTACT(state, id) {
  const index = state.contacts.find(contact => contact.id == id);
  state.contacts.splice(index, 1);
}

export function ADD_CONTACT(state, value) {
  state.contacts.push(value);
}

export function UPDATE_CONTACT(state, payload) {
  Vue.set(state.contacts, payload.id, payload.contact);
}
