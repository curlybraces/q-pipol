import { client } from '../../../boot/apollo';
import { FETCH_ACTIVITIES } from '../../../graphql/queries';

export function fetchActivities({ commit }) {
  commit('SET_LOADING', true);
  return client
    .query({
      query: FETCH_ACTIVITIES
    })
    .then(({ data }) => {
      commit('SET_ACTIVITIES', data.activities);
    })
    .catch(err => console.log(err.message))
    .finally(() => commit('SET_LOADING', false));
}
