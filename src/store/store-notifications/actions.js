import { apolloClient } from '../../boot/apollo';
import {FETCH_NOTIFICATIONS_QUERY, MARK_ALL_AS_READ_MUTATION, MARK_AS_READ_MUTATION} from '../../constants/graphql';
import {showErrorNotification, showSuccessNotification} from "../../functions/function-show-notifications";

export function fetchNotifications({ commit }) {
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
      if (res.data.markAsRead.status == 'SUCCESS') {
        const payload = {
          id: res.data.markAsRead.notification.id,
          notification: res.data.markAsRead.notification
        }

        commit('UPDATE_NOTIFICATION',payload);
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    })
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
    })
}
