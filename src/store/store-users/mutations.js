import Vue from "vue";

export function ADD_USER(state, payload) {
  Vue.set(state.users, payload.id, payload.user);
}

export function SET_USERS(state, value) {
  state.users = value;
}

export function UPDATE_USER(state, payload) {
  const index = state.users.findIndex(user => user.id == payload.id);
  state.users[index].active = payload.active;
}

export function SET_SEARCH(state, value) {
  state.search = value;
}
