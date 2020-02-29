import { apolloClient } from "boot/apollo";
import {
  FETCH_DISTRICTS,
  FETCH_OPERATING_UNITS,
  FETCH_PROVINCES,
  FETCH_REGIONS,
  FETCH_SPATIAL_COVERAGES
} from "../../constants/graphql";

export function fetchDistricts({ commit }) {
  apolloClient
    .query({
      query: FETCH_DISTRICTS
    })
    .then(res => {
      commit("SET_DISTRICTS", res.data.districts);
    });
}

export function fetchOperatingUnits({ commit }) {
  apolloClient
    .query({
      query: FETCH_OPERATING_UNITS
    })
    .then(res => {
      commit("SET_OPERATING_UNITS", res.data.operating_units);
    });
}

export function fetchProvinces({ commit }) {
  apolloClient
    .query({
      query: FETCH_PROVINCES
    })
    .then(res => {
      commit("SET_PROVINCES", res.data.provinces);
    });
}

export function fetchRegions({ commit }) {
  apolloClient
    .query({
      query: FETCH_REGIONS
    })
    .then(res => {
      commit("SET_REGIONS", res.data.regions);
    });
}

export function fetchSpatialCoverages({ commit }) {
  apolloClient
    .query({
      query: FETCH_SPATIAL_COVERAGES
    })
    .then(res => {
      commit("SET_SPATIAL_COVERAGES", res.data.spatial_coverages);
    });
}
