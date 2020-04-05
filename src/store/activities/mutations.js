import Vue from 'vue';

export function ADD_ACTIVITY(state, payload) {
  Vue.set(state.activities, payload.id, payload.activity);
}

export function SET_LOADING(state, payload) {
  state.loading = payload;
}
