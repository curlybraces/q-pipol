import { apolloClient } from '../../boot/apollo';
import {
  MARK_ALL_AS_READ_MUTATION,
  MARK_AS_READ_MUTATION
} from '../../graphql/mutations';
import { showErrorNotification } from '../../functions/function-show-notifications';

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
