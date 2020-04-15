import { apolloClient } from 'boot/apollo-boost';
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
  FETCH_TYPOLOGIES,
  FETCH_IMPLEMENTATION_MODES
} from '../../graphql/queries';

export function fetchDistricts({ commit }) {
  apolloClient
    .query({
      query: FETCH_DISTRICTS
    })
    .then(({ data }) => {
      commit('SET_DISTRICTS', data.districts);
    })
    .catch(err => console.log(err.message));
}

export function fetchFundingSources({ commit }) {
  apolloClient
    .query({
      query: FETCH_FUNDING_SOURCES
    })
    .then(({ data }) => {
      commit('SET_FUNDING_SOURCES_OPTIONS', data.funding_sources);
    });
}

export function fetchImplementationModes({ commit }) {
  apolloClient
    .query({
      query: FETCH_IMPLEMENTATION_MODES
    })
    .then(({ data }) => {
      commit('SET_IMPLEMENTATION_MODES', data.implementation_modes);
    })
    .catch(err => console.log(err.message));
}

export function fetchOperatingUnits({ commit }) {
  apolloClient
    .query({
      query: FETCH_OPERATING_UNITS
    })
    .then(({ data }) => {
      commit('SET_OPERATING_UNITS', data.operating_units);
    });
}

export function fetchProjectStatuses({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROJECT_STATUSES
    })
    .then(({ data }) => {
      commit('SET_PROJECT_STATUSES', data.project_statuses);
    });
}

export function fetchProvinces({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROVINCES
    })
    .then(({ data }) => {
      commit('SET_PROVINCES', data.provinces);
    });
}

export function fetchRegions({ commit }) {
  apolloClient
    .query({
      query: FETCH_REGIONS
    })
    .then(({ data }) => {
      commit('SET_REGIONS', data.regions);
    });
}

export function fetchSpatialCoverages({ commit }) {
  apolloClient
    .query({
      query: FETCH_SPATIAL_COVERAGES
    })
    .then(({ data }) => {
      commit('SET_SPATIAL_COVERAGES', data.spatial_coverages);
    });
}

export function fetchTechnicalReadinesses({ commit }) {
  apolloClient
    .query({
      query: FETCH_TECHNICAL_READINESSES
    })
    .then(({ data }) => {
      commit('SET_TECHNICAL_READINESSES', data.technical_readinesses);
    });
}

export function fetchRoles({ commit }) {
  apolloClient
    .query({
      query: FETCH_ROLES
    })
    .then(({ data }) => {
      commit('SET_ROLES', data.roles);
    });
}

export function fetchTiers({ commit }) {
  apolloClient
    .query({
      query: FETCH_TIERS
    })
    .then(({ data }) => {
      commit('SET_TIERS', data.tiers);
    });
}

export function fetchTypologies({ commit }) {
  apolloClient
    .query({
      query: FETCH_TYPOLOGIES
    })
    .then(({ data }) => {
      commit('SET_TYPOLOGIES', data.typologies);
    });
}

export function fetchYears({ commit }) {
  apolloClient
    .query({
      query: FETCH_YEARS
    })
    .then(({ data }) => {
      // the backend is using singular year
      commit('SET_YEARS', data.years);
    })
    .catch(err => console.log(err.message));
}

export function initializeOptions({ state, dispatch, commit }) {
  if (!state.initialized) {
    dispatch('options/fetchDistricts', null, { root: true });
    dispatch('options/fetchFundingSources', null, { root: true });
    dispatch('options/fetchImplementationModes', null, { root: true });
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
