import { axiosInstance } from "boot/axios";

const state = {
  approval_levels: localStorage.getItem('approval_levels') || [],
  categorizations: localStorage.getItem('categorizations') || [],
  cip_types: localStorage.getItem('cip_types') || [],
  city_municipalities: localStorage.getItem('city_municipalities') || [],
  contact_types: localStorage.getItem('contact_types') || [],
  funding_institutions: localStorage.getItem('funding_institutions') || [],
  funding_sources: localStorage.getItem('funding_sources') || [],
  gad_readinesses: localStorage.getItem('gad_readinesses') || [],
  implementation_bases: localStorage.getItem('implementation_bases') || [],
  implementation_modes: localStorage.getItem('implementation_modes') || [],
  implementation_periods: localStorage.getItem('implementation_periods') || [],
  implementation_readinesses: localStorage.getItem('implementation_readinesses') || [],
  infrastructure_sectors: localStorage.getItem('infrastructure_sectors') || [],
  infrastructure_subsectors: localStorage.getItem('infrastructure_subsectors') || [],
  operating_units: localStorage.getItem('operating_units') || [],
  pap_types: localStorage.getItem('pap_types') || [],
  pdp_chapters: localStorage.getItem('pdp_chapters') || [],
  pdp_indicators: localStorage.getItem('pdp_indicators') || [],
  pdp_outcomes: localStorage.getItem('pdp_outcomes') || [],
  pdp_outputs: localStorage.getItem('pdp_outputs') || [],
  permissions: localStorage.getItem('permissions') || [],
  pip_types: localStorage.getItem('pip_types') || [],
  preparation_documents: localStorage.getItem('preparation_documents') || [],
  programming_documents: localStorage.getItem('programming_documents') || [],
  provinces: localStorage.getItem('provinces') || [],
  regions: localStorage.getItem('regions') || [],
  roles: localStorage.getItem('roles') || [],
  spatial_coverages: localStorage.getItem('spatial_coverages') || [],
  sustainable_development_goals: localStorage.getItem('sustainable_development_goals') || [],
  ten_point_agenda: localStorage.getItem('ten_point_agenda') || []
};

const mutations = {
  setApprovalLevels( state, value ) {
    state.approval_levels = value;
  },
  setCategorizations( state, value ) {
    state.categorizations = value;
  },
  setCipTypes( state, value ) {
    state.cip_types = value;
  },
  setCityMunicipalities( state, value ) {
    state.city_municipalities = value;
  },
  setContactTypes( state, value ) {
    state.contact_types = value;
  },
  setFundingInstitutions( state, value ) {
    state.funding_institutions = value;
  }
};

const actions = {
  loadApprovalLevels( { commit } ) {
    axiosInstance.get('/approval_levels')
    .then(res => {
      localStorage.setItem('approval_levels', JSON.stringify(res.data));
      commit('setApprovalLevels', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  },
  loadCategorizations( { commit } ) {
    axiosInstance.get('/categorizations')
    .then(res => {
      localStorage.setItem('categorizations', JSON.stringify(res.data));
      commit('setCategorizations', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  },
  loadCipTypes( { commit } ) {
    axiosInstance.get('/cip_types')
    .then(res => {
      localStorage.setItem('cip_types', JSON.stringify(res.data));
      commit('setCipTypes', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  },
  loadCityMunicipalities( { commit } ) {
    axiosInstance.get('/city_municipalities')
    .then(res => {
      localStorage.setItem('city_municipalities', JSON.stringify(res.data));
      commit('setCityMunicipalities', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  },
  loadContactTypes( { commit } ) {
    axiosInstance.get('/contact_types')
    .then(res => {
      localStorage.setItem('contact_types', JSON.stringify(res.data));
      commit('setContactTypes', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  },
  loadFundingInstitutions( { commit } ) {
    axiosInstance.get('/funding_institutions')
    .then(res => {
      localStorage.setItem('funding_institutions', JSON.stringify(res.data));
      commit('setFundingInstitutions', res.data);
    })
    .catch(e => {
      console.log('Error: ', e.message);
    })
  }
  /*
  funding_institutions: localStorage.getItem('funding_institutions') || [],
  funding_sources: localStorage.getItem('funding_sources') || [],
  gad_readinesses: localStorage.getItem('gad_readinesses') || [],
  implementation_bases: localStorage.getItem('implementation_bases') || [],
  implementation_modes: localStorage.getItem('implementation_modes') || [],
  implementation_periods: localStorage.getItem('implementation_periods') || [],
  implementation_readinesses: localStorage.getItem('implementation_readinesses') || [],
  infrastructure_sectors: localStorage.getItem('infrastructure_sectors') || [],
  infrastructure_subsectors: localStorage.getItem('infrastructure_subsectors') || [],
  operating_units: localStorage.getItem('operating_units') || [],
  pap_types: localStorage.getItem('pap_types') || [],
  pdp_chapters: localStorage.getItem('pdp_chapters') || [],
  pdp_indicators: localStorage.getItem('pdp_indicators') || [],
  pdp_outcomes: localStorage.getItem('pdp_outcomes') || [],
  pdp_outputs: localStorage.getItem('pdp_outputs') || [],
  permissions: localStorage.getItem('permissions') || [],
  pip_types: localStorage.getItem('pip_types') || [],
  preparation_documents: localStorage.getItem('preparation_documents') || [],
  programming_documents: localStorage.getItem('programming_documents') || [],
  provinces: localStorage.getItem('provinces') || [],
  regions: localStorage.getItem('regions') || [],
  roles: localStorage.getItem('roles') || [],
  spatial_coverages: localStorage.getItem('spatial_coverages') || [],
  sustainable_development_goals: localStorage.getItem('sustainable_development_goals') || [],
  ten_point_agenda: localStorage.getItem('ten_point_agenda') || []
  */
};

const getters = {

};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
