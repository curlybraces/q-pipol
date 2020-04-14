import { apolloClient } from '../../boot/apollo';
import {
  MARK_ALL_AS_READ_MUTATION,
  MARK_AS_READ_MUTATION
} from '../../graphql/mutations';
import { showErrorNotification } from '../../functions/function-show-notifications';
import {GET_CURRENT_USER} from '../../graphql/queries';

export function markAsRead({}, payload) {
  apolloClient
    .mutate({
      mutation: MARK_AS_READ_MUTATION,
      variables: payload,
	    update: (store, { data: markAsRead }) => {
      	console.log('store: ', store);
      	console.log('mark as read: ', markAsRead)
		    
		    const data = store.readQuery({
			    query: GET_CURRENT_USER
		    })
		    
		    data.getCurrentUser.unreadNotifications = data.getCurrentUser.unreadNotifications.filter(notif => notif.id !== markAsRead.id)
		    
		    store.writeQuery({ query: GET_CURRENT_USER, data })
		    
		    console.log(data.getCurrentUser)
	    }
    })
    .then(({ data }) => {
      if (data.markAsRead.status === 'SUCCESS') {
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
