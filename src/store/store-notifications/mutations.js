import Vue from 'vue';

export function ADD_NOTIFICATION(state, payload) {
  Vue.set(state.notifications, payload.id, payload.notification);
}
