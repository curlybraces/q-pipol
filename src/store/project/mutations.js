import { updateField } from 'vuex-map-fields';
import { INITIAL_STATE } from './state';

export function CLEAR_PROJECT(state) {
  state.project = INITIAL_STATE;
}

export function addRegionRow(state, value) {
  state.project.regions.push(value);
}

export function deleteRegion(state, index) {
  state.project.regions.splice(index, 1);
}

export function updateRegionRow(state, payload) {
  state.project.regions.splice(payload.index, 1, payload.region);
}

export function addFundingSourceRow(state, value) {
  state.project.funding_sources.push(value);
}

export function deleteFundingSourceRow(state, index) {
  state.project.funding_sources.splice(index, 1);
}

export function updateFundingSourceRow(state, payload) {
  state.project.funding_sources.splice(
    payload.index,
    1,
    payload.funding_source
  );
}

export function SET_PROJECT(state, payload) {
  state.project = payload;
}

export function SET_LOADING(state, value) {
  state.loading = value;
}

export { updateField };
