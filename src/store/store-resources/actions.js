import { apolloClient } from "../../boot/apollo";
import {FETCH_RESOURCES_QUERY} from "../../constants/graphql";
import {showErrorNotification} from "../../functions/function-show-notifications";

export function fetchResources({ commit }) {
  commit('SET_LOADING', true);
  return apolloClient
    .query({
      query: FETCH_RESOURCES_QUERY
    })
    .then(res => {
      res.data.resources.forEach(resource => {
        const payload = {
          id: 'ID' + resource.id,
          resource: resource
        };
        commit('ADD_RESOURCE',payload);
      });
      commit('SET_LOADING',false);
    })
    .catch(err => {
      showErrorNotification({
        message: err.message
      });
      commit('SET_LOADING',false);
      commit('SET_ERROR',true);
    });
}
