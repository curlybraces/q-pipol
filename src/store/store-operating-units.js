import { apolloClient } from "../boot/apollo";
import Vue from 'vue';
import gql from 'graphql-tag';
import { showErrorNotification } from "../functions/function-show-notifications";

const state = {
  operating_units: {}
}

const getters = {}

const mutations = {
  ADD_OPERATING_UNIT(state, payload) {
    Vue.set(state.operating_units, payload.id, payload.operating_unit);
  }
}

const actions = {
  fetchOperatingUnits({ commit }) {
    return apolloClient.query({
      query: gql`
        query operating_units {
          operating_units {
            id
            acronym
            image
          }
        }
      `
    })
    .then(res => {
      res.data.operating_units.forEach(ou => {
        const payload = {
          id: 'ID'+ ou.id,
          operating_unit: ou
        }
        commit('ADD_OPERATING_UNIT',payload);
      });
    })
    .catch(err => showErrorNotification({
      message: err.message
    }));
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
