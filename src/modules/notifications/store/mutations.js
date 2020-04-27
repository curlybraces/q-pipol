import Vue from 'vue';

// add all notifications
export function ADD_NOTIFICATION(state, payload) {
  Vue.set(state.notifications, payload.id, payload.notification);
}

// add all unread notifications
export function ADD_UNREAD_NOTIFICATION(state, payload) {
  Vue.set(state.unreadNotifications, payload.id, payload.notification);
}

export function UPDATE_NOTIFICATION(state, payload) {
  // Vue.set(state.notifications[payload.id], 'read_at', payload.read_at);
  console.log(state, payload);
}

export function SET_LOADING(state, value) {
  state.loading = value;
}
