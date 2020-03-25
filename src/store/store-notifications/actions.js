import { apolloClient } from '../../boot/apollo';
import { FETCH_NOTIFICATIONS_QUERY } from '../../constants/graphql';

export function fetchNotifications() {
  return apolloClient
    .query({
      query: FETCH_NOTIFICATIONS_QUERY
    })
    .then(res => console.log(res));
}
