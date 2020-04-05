import { apolloClient } from '../../boot/apollo';
import { FETCH_ACTIVITIES } from '../../constants/graphql';

export function fetchActivities({ commit }) {
  commit('SET_LOADING', true);
  return apolloClient
    .query({
      query: FETCH_ACTIVITIES
    })
    .then(res => {
      res.data.me.activities.forEach(activity => {
        const payload = {
          id: activity.id,
          activity: activity
        };
        commit('ADD_ACTIVITY', payload);
      });
    })
    .catch(err => console.log(err.message))
    .finally(() => commit('SET_LOADING', false));
}
