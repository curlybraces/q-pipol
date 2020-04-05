import { apolloClient } from '../../boot/apollo';
import {
  FETCH_NOTIFICATIONS_QUERY,
  FETCH_UNREAD_NOTIFICATIONS_QUERY,
  MARK_ALL_AS_READ_MUTATION,
  MARK_AS_READ_MUTATION
} from '../../constants/graphql';
import { showErrorNotification } from '../../functions/function-show-notifications';

export function fetchNotifications({ commit }) {
  commit('SET_LOADING', true);
  return apolloClient
    .query({
      query: FETCH_NOTIFICATIONS_QUERY
    })
    .then(res => {
      res.data.me.notifications.forEach(notification => {
        const payload = {
          id: notification.id,
          notification: notification
        };
        commit('ADD_NOTIFICATION', payload);
      });
    })
    .catch(err => console.log(err.message))
    .finally(() => commit('SET_LOADING', false));
}

export function fetchUnreadNotifications({ commit }) {
  return apolloClient
    .query({
      query: FETCH_UNREAD_NOTIFICATIONS_QUERY
    })
    .then(res => {
      res.data.me.unreadNotifications.forEach(notification => {
        const payload = {
          id: notification.id,
          notification: notification
        };
        commit('ADD_UNREAD_NOTIFICATION', payload);
      });
    });
}

export function markAsRead({ commit }, payload) {
  return apolloClient
    .mutate({
      mutation: MARK_AS_READ_MUTATION,
      variables: {
        id: payload.id
      }
    })
    .then(res => {
      if (res.data.markAsRead.status === 'SUCCESS') {
        const updatedNotification = {
          id: payload.id,
          read_at: Date.now()
        };
        commit('UPDATE_NOTIFICATION', updatedNotification);
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}

export function markAllAsRead({ dispatch }) {
  return apolloClient
    .mutate({
      mutation: MARK_ALL_AS_READ_MUTATION
    })
    .then(res => {
      if (res.data.markAllAsRead.status == 'SUCCESS') {
        dispatch('fetchNotifications');
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}
