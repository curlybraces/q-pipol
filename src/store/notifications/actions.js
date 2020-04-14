import { apolloClient } from '../../boot/apollo';
import {
  MARK_ALL_AS_READ_MUTATION,
  MARK_AS_READ_MUTATION
} from '../../graphql/mutations';
import { showErrorNotification } from '../../functions/function-show-notifications';

export function markAsRead({}, payload) {
  apolloClient
    .mutate({
      mutation: MARK_AS_READ_MUTATION,
      variables: payload
    })
    .then(res => {
      if (res.data.markAsRead.status === 'SUCCESS') {
        // const updatedNotification = {
        //   id: payload.id,
        //   read_at: Date.now()
        // };
        // commit('UPDATE_NOTIFICATION', updatedNotification);
        console.log('marked notification as read');
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
