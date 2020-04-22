import { apolloClient } from '../../boot/apollo-boost';
import {
  MARK_ALL_AS_READ_MUTATION,
  MARK_AS_READ_MUTATION
} from '../../graphql/mutations';
import { showErrorNotification } from '../../functions/function-show-notifications';
import { FETCH_UNREAD_NOTIFICATIONS_QUERY } from '../../graphql/queries';

export function markAsRead({}, payload) {
  return apolloClient
    .mutate({
      mutation: MARK_AS_READ_MUTATION,
      variables: payload,
      update: (store, { data: { markAsRead } }) => {
        const data = store.readQuery({
          query: FETCH_UNREAD_NOTIFICATIONS_QUERY
        });

        data.me.unreadNotifications = data.me.unreadNotifications.filter(
          notif => notif.id !== markAsRead.id
        );

        store.writeQuery({
          query: FETCH_UNREAD_NOTIFICATIONS_QUERY,
          data
        });
      }
    })
    .then(({ data }) => {
      if (data.markAsRead.status === 'SUCCESS') {
        console.log('marked notification as read');
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}

export function markAllAsRead({}) {
  return apolloClient
    .mutate({
      mutation: MARK_ALL_AS_READ_MUTATION,
      update: (store, { data: { markAllAsRead } }) => {
        if (markAllAsRead.status == 'SUCCESS') {
          const data = store.readQuery({
            query: FETCH_UNREAD_NOTIFICATIONS_QUERY
          });

          data.me.unreadNotifications = [];

          store.writeQuery({
            query: FETCH_UNREAD_NOTIFICATIONS_QUERY,
            data
          });
        }
      }
    })
    .then(({ data }) => {
      if (data.markAllAsRead.status == 'SUCCESS') {
        return;
      } else {
        Promise.reject();
      }
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
    });
}
