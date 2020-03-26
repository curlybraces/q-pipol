import Vue from 'vue';

export function ADD_RESOURCE(state, payload) {
  Vue.set(state.resources,payload.id,payload.resource);
}

export function SET_LOADING(state, value) {
  state.loading = value;
}

export function SET_ERROR(state, value) {
  state.error = value;
}
