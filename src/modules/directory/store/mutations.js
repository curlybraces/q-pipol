import Vue from 'vue';

export function ADD_CONTACT(state, payload) {
  Vue.set(state.contacts, payload.id, payload.contact);
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

export function UPDATE_CONTACT(state, payload) {
  Vue.set(state.contacts, payload.id, payload.contact);
}

export function DELETE_CONTACT(state, id) {
  Vue.delete(state.contacts, id);
}
