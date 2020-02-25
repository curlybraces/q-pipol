// Project Store
import { getField, updateField } from "vuex-map-fields";
import { apolloClient } from "boot/apollo";
import { CREATE_PROJECT_MUTATION } from "../constants/graphql";
import { convertToNumber } from "../functions/function-convert-to-number";

const state = {
  // properties
  project: {
    title: null,
    type_id: null,
    description: null,
    goals: null,
    outcomes: null,
    purpose: null,
    expected_outputs: null,
    beneficiaries: null,
    employment_generated: null,
    gad_score: null,
    project_status_id: null,
    total_project_cost: null,
    target_start_year: null,
    target_end_year: null,
    implementation_start_date: null,
    implementation_end_date: null,
    pip: false,
    cip: false,
    trip: false,
    rdip: false,
    pcip: false,
    afmip: false,
    operating_unit_id: null,
    tier_id: null,
    typology_id: null,
    spatial_coverage_id: null,
    cities_municipalities: null,
    implementation_mode_id: null,
    estimated_project_life: null,
    financial_benefit_cost_ratio: null,
    financial_net_present_value: null,
    financial_internal_rate_return: null,
    economic_benefit_cost_ratio: null,
    economic_net_present_value: null,
    economic_internal_rate_return: null,
    implementation_risk: null,
    mitigation_strategy: null,
    clearinghouse: false,
    clearinghouse_date: null,
    neda_submission: false,
    neda_submission_date: null,
    neda_secretariat_review: false,
    neda_secretariat_review_date: null,
    neda_board: false,
    neda_board_date: null,
    icc_endorsed: false,
    icc_endorsed_date: null,
    icc_approved: false,
    icc_approved_date: null,
    fs_target_2017: null,
    fs_target_2018: null,
    fs_target_2019: null,
    fs_target_2020: null,
    fs_target_2021: null,
    fs_target_2022: null,
    fs_target_total: null,
    row_target_2017: null,
    row_target_2018: null,
    row_target_2019: null,
    row_target_2020: null,
    row_target_2021: null,
    row_target_2022: null,
    row_target_total: null,
    row_affected_2017: null,
    row_affected_2018: null,
    row_affected_2019: null,
    row_affected_2020: null,
    row_affected_2021: null,
    row_affected_2022: null,
    rap_target_2017: null,
    rap_target_2018: null,
    rap_target_2019: null,
    rap_target_2020: null,
    rap_target_2021: null,
    rap_target_2022: null,
    rap_target_total: null,
    rap_affected_2017: null,
    rap_affected_2018: null,
    rap_affected_2019: null,
    rap_affected_2020: null,
    rap_affected_2021: null,
    rap_affected_2022: null,
    investment_target_2016: null,
    investment_target_2017: null,
    investment_target_2018: null,
    investment_target_2019: null,
    investment_target_2020: null,
    investment_target_2021: null,
    investment_target_2022: null,
    investment_target_2023: null,
    investment_target_total: null,
    infrastructure_target_2016: null,
    infrastructure_target_2017: null,
    infrastructure_target_2018: null,
    infrastructure_target_2019: null,
    infrastructure_target_2020: null,
    infrastructure_target_2021: null,
    infrastructure_target_2022: null,
    infrastructure_target_2023: null,
    infrastructure_target_total: null,
    nep_2016: null,
    nep_2017: null,
    nep_2018: null,
    nep_2019: null,
    nep_2020: null,
    nep_2021: null,
    nep_2022: null,
    nep_2023: null,
    gaa_2016: null,
    gaa_2017: null,
    gaa_2018: null,
    gaa_2019: null,
    gaa_2020: null,
    gaa_2021: null,
    gaa_2022: null,
    gaa_2023: null,
    disbursement_2016: null,
    disbursement_2017: null,
    disbursement_2018: null,
    disbursement_2019: null,
    disbursement_2020: null,
    disbursement_2021: null,
    disbursement_2022: null,
    disbursement_2023: null,
    updates: null,
    updates_date: null,
    technical_readinesses: [],
    bases: [],
    districts: [],
    regions: [],
    provinces: [],
    funding_sources: []
  }
};

const mutations = {
  updateField,
  addRegionRow(state, value) {
    state.project.regions.push(value);
  },
  deleteRegion(state, index) {
    state.project.regions.splice(index,1);
  },
  updateRegionRow(state, payload) {
    state.project.regions.splice(payload.index, 1, payload.region);
  } 
};

const actions = {
  // actions
  createProject({ state }) {
    const { project } = state;
    apolloClient
      .mutate({
        mutation: CREATE_PROJECT_MUTATION,
        variables: {
          pip: project.pip,
          cip: project.cip,
          trip: project.trip,
          title: project.title,
          type_id: project.type_id,
          operating_unit_id: project.operating_unit_id,
          implementation_mode_id: project.implementation_mode_id,
          project_status_id: project.project_status_id,
          typology_id: project.typology_id,
          tier_id: project.tier_id,
          spatial_coverage_id: project.spatial_coverage_id,
          cities_municipalities: project.cities_municipalities,
          rdip: project.rdip,
          pcip: project.pcip,
          description: project.description,
          components: project.components,
          goals: project.goals,
          outcomes: project.outcomes,
          purpose: project.purpose,
          expected_outputs: project.expected_outputs,
          beneficiaries: project.beneficiaries,
          employment_generated: project.employment_generated,
          target_start_year: project.target_start_year,
          target_end_year: project.target_end_year,
          implementation_start_date: project.implementation_start_date,
          implementation_end_date: project.implementation_end_date,
          clearinghouse: project.clearinghouse,
          clearinghouse_date: project.clearinghouse_date,
          total_project_cost: convertToNumber(project.total_project_cost),
          implementation_risk: project.implementation_risk,
          mitigation_strategy: project.mitigation_strategy,
          income_increase: project.income_increase,
          gad_score: project.gad_score,
          estimated_project_life: project.estimated_project_life,
          financial_benefit_cost_ratio: project.financial_benefit_cost_ratio,
          financial_internal_rate_return:
            project.financial_internal_rate_return,
          financial_net_present_value: project.financial_net_present_value,
          economic_benefit_cost_ratio: project.economic_benefit_cost_ratio,
          economic_internal_rate_return: project.economic_internal_rate_return,
          economic_net_present_value: project.economic_net_present_value,
          bases: {
            connect: project.bases
          },
          regions: {
            connect: project.regions
          },
          provinces: {
            connect: project.provinces
          },
          districts: {
            connect: project.districts
          },
          funding_sources: project.funding_sources,
          updates: project.updates,
          updates_date: project.updates_date
        }
      })
      .then(data => {
        console.log(data);
        this.onReset();
      })
      .catch(err => {
        console.log(err.message);
      })
      .finally(() => {
        console.log("done");
      });
  }
};

const getters = {
  getField,
  nep_total: state =>
    convertToNumber(state.project.nep_2017) +
    convertToNumber(state.project.nep_2018) +
    convertToNumber(state.project.nep_2019) +
    convertToNumber(state.project.nep_2020) +
    convertToNumber(state.project.nep_2021) +
    convertToNumber(state.project.nep_2022),
  gaa_total: state =>
    convertToNumber(state.project.gaa_2017) +
    convertToNumber(state.project.gaa_2018) +
    convertToNumber(state.project.gaa_2019) +
    convertToNumber(state.project.gaa_2020) +
    convertToNumber(state.project.gaa_2021) +
    convertToNumber(state.project.gaa_2022),
  disbursement_total: state =>
    convertToNumber(state.project.disbursement_2017) +
    convertToNumber(state.project.disbursement_2018) +
    convertToNumber(state.project.disbursement_2019) +
    convertToNumber(state.project.disbursement_2020) +
    convertToNumber(state.project.disbursement_2021) +
    convertToNumber(state.project.disbursement_2022)
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
