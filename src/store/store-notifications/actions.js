import { apolloClient } from '../../boot/apollo';
import { FETCH_NOTIFICATIONS_QUERY } from '../../constants/graphql';

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
