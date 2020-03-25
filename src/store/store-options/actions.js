import { apolloClient } from 'boot/apollo';
import {
  FETCH_DISTRICTS,
  FETCH_FUNDING_SOURCES,
  FETCH_OPERATING_UNITS,
  FETCH_PROVINCES,
  FETCH_REGIONS,
  FETCH_SPATIAL_COVERAGES,
  FETCH_PROJECT_STATUSES,
  FETCH_TECHNICAL_READINESSES,
  FETCH_ROLES,
  FETCH_YEARS,
  FETCH_TIERS,
  FETCH_TYPOLOGIES
} from '../../constants/graphql';

export function fetchDistricts({ commit }) {
  apolloClient
    .query({
      query: FETCH_DISTRICTS
    })
    .then(res => {
      commit('SET_DISTRICTS', res.data.districts);
    })
    .catch(err => console.log(err.message));
}

export function fetchFundingSources({ commit }) {
  apolloClient
    .query({
      query: FETCH_FUNDING_SOURCES
    })
    .then(res => {
      commit('SET_FUNDING_SOURCES_OPTIONS', res.data.funding_sources);
    });
}

export function fetchOperatingUnits({ commit }) {
  apolloClient
    .query({
      query: FETCH_OPERATING_UNITS
    })
    .then(res => {
      commit('SET_OPERATING_UNITS', res.data.operating_units);
    });
}

export function fetchProjectStatuses({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROJECT_STATUSES
    })
    .then(res => {
      commit('SET_PROJECT_STATUSES', res.data.project_statuses);
    });
}

export function fetchProvinces({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROVINCES
    })
    .then(res => {
      commit('SET_PROVINCES', res.data.provinces);
    });
}

export function fetchRegions({ commit }) {
  apolloClient
    .query({
      query: FETCH_REGIONS
    })
    .then(res => {
      commit('SET_REGIONS', res.data.regions);
    });
}

export function fetchSpatialCoverages({ commit }) {
  apolloClient
    .query({
      query: FETCH_SPATIAL_COVERAGES
    })
    .then(res => {
      commit('SET_SPATIAL_COVERAGES', res.data.spatial_coverages);
    });
}

export function fetchTechnicalReadinesses({ commit }) {
  apolloClient
    .query({
      query: FETCH_TECHNICAL_READINESSES
    })
    .then(res => {
      commit('SET_TECHNICAL_READINESSES', res.data.technical_readinesses);
    });
}

export function fetchRoles({ commit }) {
  apolloClient
    .query({
      query: FETCH_ROLES
    })
    .then(res => {
      commit('SET_ROLES', res.data.roles);
    });
}

export function fetchTiers({ commit }) {
  apolloClient
    .query({
      query: FETCH_TIERS
    })
    .then(res => {
      commit('SET_TIERS', res.data.tiers);
    });
}

export function fetchTypologies({ commit }) {
  apolloClient
    .query({
      query: FETCH_TYPOLOGIES
    })
    .then(res => {
      commit('SET_TYPOLOGIES', res.data.typologies);
    });
}

export function fetchYears({ commit }) {
  apolloClient
    .query({
      query: FETCH_YEARS
    })
    .then(res => {
      // the backend is using singular year
      commit('SET_YEARS', res.data.year);
    })
    .catch(err => console.log(err.message));
}

export function initializeOptions({ state, dispatch, commit }) {
  if (!state.initialized) {
    dispatch('options/fetchDistricts', null, { root: true });
    dispatch('options/fetchFundingSources', null, { root: true });
    dispatch('options/fetchOperatingUnits', null, { root: true });
    dispatch('options/fetchProjectStatuses', null, { root: true });
    dispatch('options/fetchProvinces', null, { root: true });
    dispatch('options/fetchRegions', null, { root: true });
    dispatch('options/fetchSpatialCoverages', null, { root: true });
    dispatch('options/fetchTechnicalReadinesses', null, { root: true });
    dispatch('options/fetchRoles', null, { root: true });
    dispatch('options/fetchTiers', null, { root: true });
    dispatch('options/fetchTypologies', null, { root: true });
    dispatch('options/fetchYears', null, { root: true });
    commit('SET_INITIALIZED', true);
  }
}
