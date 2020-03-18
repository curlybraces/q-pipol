import Vue from 'vue';
import { apolloClient } from '../boot/apollo';
import { FETCH_ACTIVITIES } from '../constants/graphql';

const state = {
  activities: {},
  loading: false
};

const mutations = {
  ADD_ACTIVITY(state, payload) {
    Vue.set(state.activities, payload.id, payload.activity);
  },
  SET_LOADING(state, payload) {
    state.loading = payload;
  }
};

const actions = {
  fetchActivities({ commit }) {
    commit('SET_LOADING', true);
    apolloClient
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
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
