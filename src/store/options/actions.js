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
  FETCH_TYPES,
  FETCH_BASES,
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
    })
    .catch(err => console.log(err.message));
}

export function fetchBases({ commit }) {
  apolloClient
    .query({
      query: FETCH_BASES
    })
    .then(({ data }) => {
      commit('SET_BASES', data.bases);
    })
    .catch(err => console.log(err.message));
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
    })
    .catch(err => console.log(err.message));
}

export function fetchProjectStatuses({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROJECT_STATUSES
    })
    .then(({ data }) => {
      commit('SET_PROJECT_STATUSES', data.project_statuses);
    })
    .catch(err => console.log(err.message));
}

export function fetchProvinces({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROVINCES
    })
    .then(({ data }) => {
      commit('SET_PROVINCES', data.provinces);
    })
    .catch(err => console.log(err.message));
}

export function fetchRegions({ commit }) {
  apolloClient
    .query({
      query: FETCH_REGIONS
    })
    .then(({ data }) => {
      commit('SET_REGIONS', data.regions);
    })
    .catch(err => console.log(err.message));
}

export function fetchSpatialCoverages({ commit }) {
  apolloClient
    .query({
      query: FETCH_SPATIAL_COVERAGES
    })
    .then(({ data }) => {
      commit('SET_SPATIAL_COVERAGES', data.spatial_coverages);
    })
    .catch(err => console.log(err.message));
}

export function fetchTechnicalReadinesses({ commit }) {
  apolloClient
    .query({
      query: FETCH_TECHNICAL_READINESSES
    })
    .then(({ data }) => {
      commit('SET_TECHNICAL_READINESSES', data.technical_readinesses);
    })
    .catch(err => console.log(err.message));
}

export function fetchRoles({ commit }) {
  apolloClient
    .query({
      query: FETCH_ROLES
    })
    .then(({ data }) => {
      commit('SET_ROLES', data.roles);
    })
    .catch(err => console.log(err.message));
}

export function fetchTiers({ commit }) {
  apolloClient
    .query({
      query: FETCH_TIERS
    })
    .then(({ data }) => {
      commit('SET_TIERS', data.tiers);
    })
    .catch(err => console.log(err.message));
}

export function fetchTypes({ commit }) {
  apolloClient
    .query({
      query: FETCH_TYPES
    })
    .then(({ data }) => {
      commit('SET_TYPES', data.types);
    })
    .catch(err => {
      console.log(err);
    })
    .catch(err => console.log(err.message));
}

export function fetchTypologies({ commit }) {
  apolloClient
    .query({
      query: FETCH_TYPOLOGIES
    })
    .then(({ data }) => {
      commit('SET_TYPOLOGIES', data.typologies);
    })
    .catch(err => console.log(err.message));
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

export function initializeOptions({ dispatch }) {
  dispatch('fetchDistricts');
  dispatch('fetchFundingSources');
  dispatch('fetchImplementationModes');
  dispatch('fetchBases');
  dispatch('fetchOperatingUnits');
  dispatch('fetchProjectStatuses');
  dispatch('fetchProvinces');
  dispatch('fetchRegions');
  dispatch('fetchSpatialCoverages');
  dispatch('fetchTechnicalReadinesses');
  dispatch('fetchRoles');
  dispatch('fetchTiers');
  dispatch('fetchTypes');
  dispatch('fetchTypologies');
  dispatch('fetchYears');
}
