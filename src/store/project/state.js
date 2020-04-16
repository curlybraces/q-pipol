export const INITIAL_STATE = {
  id: null,
  // required data
  title: 'Test project',
  type_id: '1',
  operating_unit_id: '1',
  description: 'Some description',
  total_project_cost: 1500000,
  project_status_id: '1',
  typology_id: '1',
  main_funding_source_id: null,
  // end of required data
  goals: null,
  outcomes: null,
  purpose: null,
  expected_outputs: null,
  beneficiaries: null,
  employment_generated: null,
  gad_score: null,
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
  tier_id: null,
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
  selected_technical_readinesses: [],
  selected_bases: [],
  selected_districts: [],
  regions: [],
  selected_regions: [],
  selected_provinces: [],
  funding_sources: []
};

export default function() {
  return {
    project: INITIAL_STATE,
    loading: false,
    required: ['title', 'type_id', 'description']
  };
}
