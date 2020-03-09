import Vue from "vue";

export function ADD_USER(state, payload) {
  Vue.set(state.users, payload.id, payload.user);
}

export function ACTIVATE_USER(state, payload) {
  state.users[payload.id].active = true;
}

export function DEACTIVATE_USER(state, payload) {
  state.users[payload.id].active = false;
}

export function ASSIGN_ROLE(state, payload) {
  state.users[payload.id].role = payload.role;
}

export function SET_SEARCH(state, value) {
  state.search = value;
}

export function SET_LOADING(state, value) {
  state.loading = value;
}
