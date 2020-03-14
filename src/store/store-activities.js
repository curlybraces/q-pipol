import Vue from 'vue';
import { apolloClient } from '../boot/apollo';
import { FETCH_ACTIVITIES } from '../constants/graphql';

const state = {
  activities: {}
};

const mutations = {
  ADD_ACTIVITY(state, payload) {
    Vue.set(state.activities, payload.id, payload.activity);
  }
};

const actions = {
  fetchActivities({ commit }) {
    apolloClient
      .query({
        query: FETCH_ACTIVITIES
      })
      .then(res => {
        res.data.me.activities.forEach(activity => {
          console.log(activity);
          const payload = {
            id: activity.id,
            activity: activity
          };
          commit('ADD_ACTIVITY', payload);
        });
      });
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
