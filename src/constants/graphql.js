import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      user {
        id
        name
        email
        role {
          name
        }
      }
      access_token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation register(
    $name: String!
    $email: String!
    $password: String!
    $password_confirmation: String!
  ) {
    register(
      input: {
        name: $name
        email: $email
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      tokens {
        access_token
      }
      status
    }
  }
`;

export const ACTIVATE_USER = gql`
  mutation activateUser($id: ID!) {
    activateUser(id: $id) {
      user {
        id
        active
      }
      status
      message
    }
  }
`;

export const DEACTIVATE_USER = gql`
  mutation deactivateUser($id: ID!) {
    deactivateUser(id: $id) {
      user {
        id
        active
      }
      status
      message
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      position
      operating_unit_id
      operating_unit {
        id
        image
      }
      contact_number
      role {
        name
      }
      image_url
      notifications
      unreadNotifications
    }
  }
`;

export const ASSIGN_ROLE_MUTATION = gql`
  mutation assignRole($user_id: ID!, $role_id: ID) {
    assignRole(user_id: $user_id, role_id: $role_id) {
      user {
        id
        role {
          id
          name
        }
      }
      status
      message
    }
  }
`;

export const UPDATE_IMAGE_URL_MUTATION = gql`
  mutation updateImageUrlMutation($image_url: String!) {
    updateImageUrlMutation(image_url: $image_url) {
      id
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation updateUser(
    $name: String
    $operating_unit_id: ID
    $position: String
    $contact_number: String
  ) {
    updateUser(
      input: {
        name: $name
        operating_unit_id: $operating_unit_id
        position: $position
        contact_number: $contact_number
      }
    ) {
      id
    }
  }
`;

export const ALL_USERS = gql`
  query users {
    users {
      id
      name
      email
      active
      role {
        id
        name
      }
      created_at
    }
  }
`;

export const CREATE_PROJECT_MUTATION = gql`
  mutation createProject(
    $pipol_url: String
    $pipol_code: String
    $pip: Boolean
    $cip: Boolean
    $trip: Boolean
    $afmip: Boolean
    $title: String!
    $type_id: ID
    $operating_unit_id: ID
    $implementation_mode_id: ID
    $priority_ranking: Int
    $project_status_id: ID
    $typology_id: ID
    $tier_id: ID
    $spatial_coverage_id: ID
    $cities_municipalities: String
    $ten_point_agenda: CreateTenPointAgendaRelation
    $sustainable_development_goals: CreateSustainableDevelopmentGoalRelation
    $bases: CreateBasisRelation
    $regions: CreateRegionRelation
    $provinces: CreateProvinceRelation
    $districts: CreateDistrictRelation
    $rdip: Boolean
    $pcip: Boolean
    $description: String
    $components: String
    $goals: String
    $outcomes: String
    $purpose: String
    $expected_outputs: String
    $beneficiaries: String
    $employment_generated: String
    $target_start_year: Int
    $target_end_year: Int
    $implementation_start_date: String
    $implementation_end_date: String
    $clearinghouse: Boolean
    $clearinghouse_date: String
    $neda_submission: Boolean
    $neda_submission_date: String
    $neda_secretariat_review: Boolean
    $neda_secretariat_review_date: String
    $icc_endorsed: Boolean
    $icc_endorsed_date: String
    $icc_approved: Boolean
    $icc_approved_date: String
    $neda_board: Boolean
    $neda_board_date: String
    $total_project_cost: Float
    $implementation_risk: String
    $mitigation_strategy: String
    $income_increase: String
    $gad_score: Int
    $estimated_project_life: String
    $financial_benefit_cost_ratio: Float
    $financial_internal_rate_return: Float
    $financial_net_present_value: Float
    $economic_benefit_cost_ratio: Float
    $economic_internal_rate_return: Float
    $economic_net_present_value: Float
    $technical_readinesses: CreateTechnicalReadinessRelation
    $funding_sources: CreateFundingSourceRelation
    $fs_target_2017: Float
    $fs_target_2018: Float
    $fs_target_2019: Float
    $fs_target_2020: Float
    $fs_target_2021: Float
    $fs_target_2022: Float
    $fs_target_total: Float
    $row_target_2017: Float
    $row_target_2018: Float
    $row_target_2019: Float
    $row_target_2020: Float
    $row_target_2021: Float
    $row_target_2022: Float
    $row_target_total: Float
    $row_affected_2017: Int
    $row_affected_2018: Int
    $row_affected_2019: Int
    $row_affected_2020: Int
    $row_affected_2021: Int
    $row_affected_2022: Int
    $rap_target_2017: Float
    $rap_target_2018: Float
    $rap_target_2019: Float
    $rap_target_2020: Float
    $rap_target_2021: Float
    $rap_target_2022: Float
    $rap_target_total: Float
    $rap_affected_2017: Int
    $rap_affected_2018: Int
    $rap_affected_2019: Int
    $rap_affected_2020: Int
    $rap_affected_2021: Int
    $rap_affected_2022: Int
    $investment_target_2016: Float
    $investment_target_2017: Float
    $investment_target_2018: Float
    $investment_target_2019: Float
    $investment_target_2020: Float
    $investment_target_2021: Float
    $investment_target_2022: Float
    $investment_target_2023: Float
    $investment_target_total: Float
    $infrastructure_target_2016: Float
    $infrastructure_target_2017: Float
    $infrastructure_target_2018: Float
    $infrastructure_target_2019: Float
    $infrastructure_target_2020: Float
    $infrastructure_target_2021: Float
    $infrastructure_target_2022: Float
    $infrastructure_target_2023: Float
    $infrastructure_target_total: Float
    $nep_2016: Float
    $nep_2017: Float
    $nep_2018: Float
    $nep_2019: Float
    $nep_2020: Float
    $nep_2021: Float
    $nep_2022: Float
    $nep_2023: Float
    $nep_total: Float
    $gaa_2016: Float
    $gaa_2017: Float
    $gaa_2018: Float
    $gaa_2019: Float
    $gaa_2020: Float
    $gaa_2021: Float
    $gaa_2022: Float
    $gaa_2023: Float
    $gaa_total: Float
    $disbursement_2016: Float
    $disbursement_2017: Float
    $disbursement_2018: Float
    $disbursement_2019: Float
    $disbursement_2020: Float
    $disbursement_2021: Float
    $disbursement_2022: Float
    $disbursement_2023: Float
    $disbursement_total: Float
    $updates: String
    $updates_date: String
  ) {
    createProject(
      input: {
        pipol_url: $pipol_url
        pipol_code: $pipol_code
        pip: $pip
        cip: $cip
        trip: $trip
        afmip: $afmip
        title: $title
        type_id: $type_id
        operating_unit_id: $operating_unit_id
        implementation_mode_id: $implementation_mode_id
        priority_ranking: $priority_ranking
        project_status_id: $project_status_id
        typology_id: $typology_id
        tier_id: $tier_id
        spatial_coverage_id: $spatial_coverage_id
        cities_municipalities: $cities_municipalities
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        bases: $bases
        regions: $regions
        provinces: $provinces
        districts: $districts
        rdip: $rdip
        pcip: $pcip
        description: $description
        components: $components
        goals: $goals
        outcomes: $outcomes
        purpose: $purpose
        expected_outputs: $expected_outputs
        beneficiaries: $beneficiaries
        employment_generated: $employment_generated
        target_start_year: $target_start_year
        target_end_year: $target_end_year
        implementation_start_date: $implementation_start_date
        implementation_end_date: $implementation_end_date
        clearinghouse: $clearinghouse
        clearinghouse_date: $clearinghouse_date
        neda_submission: $neda_submission
        neda_submission_date: $neda_submission_date
        neda_secretariat_review: $neda_secretariat_review
        neda_secretariat_review_date: $neda_secretariat_review_date
        icc_endorsed: $icc_endorsed
        icc_endorsed_date: $icc_endorsed_date
        icc_approved: $icc_approved
        icc_approved_date: $icc_approved_date
        neda_board: $neda_board
        neda_board_date: $neda_board_date
        total_project_cost: $total_project_cost
        implementation_risk: $implementation_risk
        mitigation_strategy: $mitigation_strategy
        income_increase: $income_increase
        gad_score: $gad_score
        estimated_project_life: $estimated_project_life
        financial_benefit_cost_ratio: $financial_benefit_cost_ratio
        financial_internal_rate_return: $financial_internal_rate_return
        financial_net_present_value: $financial_net_present_value
        economic_benefit_cost_ratio: $economic_benefit_cost_ratio
        economic_internal_rate_return: $economic_internal_rate_return
        economic_net_present_value: $economic_net_present_value
        technical_readinesses: $technical_readinesses
        funding_sources: $funding_sources
        fs_target_2017: $fs_target_2017
        fs_target_2018: $fs_target_2018
        fs_target_2019: $fs_target_2019
        fs_target_2020: $fs_target_2020
        fs_target_2021: $fs_target_2021
        fs_target_2022: $fs_target_2022
        fs_target_total: $fs_target_total
        row_target_2017: $row_target_2017
        row_target_2018: $row_target_2018
        row_target_2019: $row_target_2019
        row_target_2020: $row_target_2020
        row_target_2021: $row_target_2021
        row_target_2022: $row_target_2022
        row_target_total: $row_target_total
        row_affected_2017: $row_affected_2017
        row_affected_2018: $row_affected_2018
        row_affected_2019: $row_affected_2019
        row_affected_2020: $row_affected_2020
        row_affected_2021: $row_affected_2021
        row_affected_2022: $row_affected_2022
        rap_target_2017: $rap_target_2017
        rap_target_2018: $rap_target_2018
        rap_target_2019: $rap_target_2019
        rap_target_2020: $rap_target_2020
        rap_target_2021: $rap_target_2021
        rap_target_2022: $rap_target_2022
        rap_target_total: $rap_target_total
        rap_affected_2017: $rap_affected_2017
        rap_affected_2018: $rap_affected_2018
        rap_affected_2019: $rap_affected_2019
        rap_affected_2020: $rap_affected_2020
        rap_affected_2021: $rap_affected_2021
        rap_affected_2022: $rap_affected_2022
        investment_target_2016: $investment_target_2016
        investment_target_2017: $investment_target_2017
        investment_target_2018: $investment_target_2018
        investment_target_2019: $investment_target_2019
        investment_target_2020: $investment_target_2020
        investment_target_2021: $investment_target_2021
        investment_target_2022: $investment_target_2022
        investment_target_2023: $investment_target_2023
        investment_target_total: $investment_target_total
        infrastructure_target_2016: $infrastructure_target_2016
        infrastructure_target_2017: $infrastructure_target_2017
        infrastructure_target_2018: $infrastructure_target_2018
        infrastructure_target_2019: $infrastructure_target_2019
        infrastructure_target_2020: $infrastructure_target_2020
        infrastructure_target_2021: $infrastructure_target_2021
        infrastructure_target_2022: $infrastructure_target_2022
        infrastructure_target_2023: $infrastructure_target_2023
        infrastructure_target_total: $infrastructure_target_total
        nep_2016: $nep_2016
        nep_2017: $nep_2017
        nep_2018: $nep_2018
        nep_2019: $nep_2019
        nep_2020: $nep_2020
        nep_2021: $nep_2021
        nep_2022: $nep_2022
        nep_2023: $nep_2023
        nep_total: $nep_total
        gaa_2016: $gaa_2016
        gaa_2017: $gaa_2017
        gaa_2018: $gaa_2018
        gaa_2019: $gaa_2019
        gaa_2020: $gaa_2020
        gaa_2021: $gaa_2021
        gaa_2022: $gaa_2022
        gaa_2023: $gaa_2023
        gaa_total: $gaa_total
        disbursement_2016: $disbursement_2016
        disbursement_2017: $disbursement_2017
        disbursement_2018: $disbursement_2018
        disbursement_2019: $disbursement_2019
        disbursement_2020: $disbursement_2020
        disbursement_2021: $disbursement_2021
        disbursement_2022: $disbursement_2022
        disbursement_2023: $disbursement_2023
        disbursement_total: $disbursement_total
        updates: $updates
        updates_date: $updates_date
      }
    ) {
      id
      title
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject(
    $id: ID!
    $pipol_url: String
    $pipol_code: String
    $pip: Boolean
    $cip: Boolean
    $trip: Boolean
    $rdip: Boolean
    $pcip: Boolean
    $afmip: Boolean
    $title: String!
    $type_id: ID
    $operating_unit_id: ID
    $implementation_mode_id: ID
    $priority_ranking: Int
    $project_status_id: ID
    $typology_id: ID
    $tier_id: ID
    $spatial_coverage_id: ID
    $cities_municipalities: String
    $ten_point_agenda: UpdateTenPointAgendaRelation
    $sustainable_development_goals: UpdateSustainableDevelopmentGoalRelation
    $bases: UpdateBasisRelation
    $regions: UpdateRegionRelation
    $provinces: UpdateProvinceRelation
    $districts: UpdateDistrictInput
    $description: String
    $components: String
    $goals: String
    $outcomes: String
    $purpose: String
    $expected_outputs: String
    $beneficiaries: String
    $employment_generated: String
    $target_start_year: Int
    $target_end_year: Int
    $implementation_start_date: String
    $implementation_end_date: String
    $clearinghouse: Boolean
    $clearinghouse_date: String
    $neda_submission: Boolean
    $neda_submission_date: String
    $neda_secretariat_review: Boolean
    $neda_secretariat_review_date: String
    $icc_endorsed: Boolean
    $icc_endorsed_date: String
    $icc_approved: Boolean
    $icc_approved_date: String
    $neda_board: Boolean
    $neda_board_date: String
    $total_project_cost: Float
    $implementation_risk: String
    $mitigation_strategy: String
    $income_increase: String
    $gad_score: Int
    $estimated_project_life: String
    $financial_benefit_cost_ratio: Float
    $financial_internal_rate_return: Float
    $financial_net_present_value: Float
    $economic_benefit_cost_ratio: Float
    $economic_internal_rate_return: Float
    $economic_net_present_value: Float
    $technical_readinesses: UpdateTechnicalReadinessesInput
    $funding_sources: UpdateFundingSourceRelation
    $fs_target_2017: Float
    $fs_target_2018: Float
    $fs_target_2019: Float
    $fs_target_2020: Float
    $fs_target_2021: Float
    $fs_target_2022: Float
    $fs_target_total: Float
    $row_target_2017: Float
    $row_target_2018: Float
    $row_target_2019: Float
    $row_target_2020: Float
    $row_target_2021: Float
    $row_target_2022: Float
    $row_target_total: Float
    $row_affected_2017: Int
    $row_affected_2018: Int
    $row_affected_2019: Int
    $row_affected_2020: Int
    $row_affected_2021: Int
    $row_affected_2022: Int
    $rap_target_2017: Float
    $rap_target_2018: Float
    $rap_target_2019: Float
    $rap_target_2020: Float
    $rap_target_2021: Float
    $rap_target_2022: Float
    $rap_target_total: Float
    $rap_affected_2017: Int
    $rap_affected_2018: Int
    $rap_affected_2019: Int
    $rap_affected_2020: Int
    $rap_affected_2021: Int
    $rap_affected_2022: Int
    $investment_target_2016: Float
    $investment_target_2017: Float
    $investment_target_2018: Float
    $investment_target_2019: Float
    $investment_target_2020: Float
    $investment_target_2021: Float
    $investment_target_2022: Float
    $investment_target_2023: Float
    $investment_target_total: Float
    $infrastructure_target_2016: Float
    $infrastructure_target_2017: Float
    $infrastructure_target_2018: Float
    $infrastructure_target_2019: Float
    $infrastructure_target_2020: Float
    $infrastructure_target_2021: Float
    $infrastructure_target_2022: Float
    $infrastructure_target_2023: Float
    $infrastructure_target_total: Float
    $nep_2016: Float
    $nep_2017: Float
    $nep_2018: Float
    $nep_2019: Float
    $nep_2020: Float
    $nep_2021: Float
    $nep_2022: Float
    $nep_2023: Float
    $nep_total: Float
    $gaa_2016: Float
    $gaa_2017: Float
    $gaa_2018: Float
    $gaa_2019: Float
    $gaa_2020: Float
    $gaa_2021: Float
    $gaa_2022: Float
    $gaa_2023: Float
    $gaa_total: Float
    $disbursement_2016: Float
    $disbursement_2017: Float
    $disbursement_2018: Float
    $disbursement_2019: Float
    $disbursement_2020: Float
    $disbursement_2021: Float
    $disbursement_2022: Float
    $disbursement_2023: Float
    $disbursement_total: Float
    $updates: String
    $updates_date: String
  ) {
    updateProject(
      input: {
        id: $id
        pipol_url: $pipol_url
        pipol_code: $pipol_code
        pip: $pip
        cip: $cip
        trip: $trip
        afmip: $afmip
        title: $title
        type_id: $type_id
        operating_unit_id: $operating_unit_id
        implementation_mode_id: $implementation_mode_id
        priority_ranking: $priority_ranking
        project_status_id: $project_status_id
        typology_id: $typology_id
        tier_id: $tier_id
        spatial_coverage_id: $spatial_coverage_id
        cities_municipalities: $cities_municipalities
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        bases: $bases
        regions: $regions
        provinces: $provinces
        districts: $districts
        rdip: $rdip
        pcip: $pcip
        description: $description
        components: $components
        goals: $goals
        outcomes: $outcomes
        purpose: $purpose
        expected_outputs: $expected_outputs
        beneficiaries: $beneficiaries
        employment_generated: $employment_generated
        target_start_year: $target_start_year
        target_end_year: $target_end_year
        implementation_start_date: $implementation_start_date
        implementation_end_date: $implementation_end_date
        clearinghouse: $clearinghouse
        clearinghouse_date: $clearinghouse_date
        neda_submission: $neda_submission
        neda_submission_date: $neda_submission_date
        neda_secretariat_review: $neda_secretariat_review
        neda_secretariat_review_date: $neda_secretariat_review_date
        icc_endorsed: $icc_endorsed
        icc_endorsed_date: $icc_endorsed_date
        icc_approved: $icc_approved
        icc_approved_date: $icc_approved_date
        neda_board: $neda_board
        neda_board_date: $neda_board_date
        total_project_cost: $total_project_cost
        implementation_risk: $implementation_risk
        mitigation_strategy: $mitigation_strategy
        income_increase: $income_increase
        gad_score: $gad_score
        estimated_project_life: $estimated_project_life
        financial_benefit_cost_ratio: $financial_benefit_cost_ratio
        financial_internal_rate_return: $financial_internal_rate_return
        financial_net_present_value: $financial_net_present_value
        economic_benefit_cost_ratio: $economic_benefit_cost_ratio
        economic_internal_rate_return: $economic_internal_rate_return
        economic_net_present_value: $economic_net_present_value
        technical_readinesses: $technical_readinesses
        funding_sources: $funding_sources
        fs_target_2017: $fs_target_2017
        fs_target_2018: $fs_target_2018
        fs_target_2019: $fs_target_2019
        fs_target_2020: $fs_target_2020
        fs_target_2021: $fs_target_2021
        fs_target_2022: $fs_target_2022
        fs_target_total: $fs_target_total
        row_target_2017: $row_target_2017
        row_target_2018: $row_target_2018
        row_target_2019: $row_target_2019
        row_target_2020: $row_target_2020
        row_target_2021: $row_target_2021
        row_target_2022: $row_target_2022
        row_target_total: $row_target_total
        row_affected_2017: $row_affected_2017
        row_affected_2018: $row_affected_2018
        row_affected_2019: $row_affected_2019
        row_affected_2020: $row_affected_2020
        row_affected_2021: $row_affected_2021
        row_affected_2022: $row_affected_2022
        rap_target_2017: $rap_target_2017
        rap_target_2018: $rap_target_2018
        rap_target_2019: $rap_target_2019
        rap_target_2020: $rap_target_2020
        rap_target_2021: $rap_target_2021
        rap_target_2022: $rap_target_2022
        rap_target_total: $rap_target_total
        rap_affected_2017: $rap_affected_2017
        rap_affected_2018: $rap_affected_2018
        rap_affected_2019: $rap_affected_2019
        rap_affected_2020: $rap_affected_2020
        rap_affected_2021: $rap_affected_2021
        rap_affected_2022: $rap_affected_2022
        investment_target_2016: $investment_target_2016
        investment_target_2017: $investment_target_2017
        investment_target_2018: $investment_target_2018
        investment_target_2019: $investment_target_2019
        investment_target_2020: $investment_target_2020
        investment_target_2021: $investment_target_2021
        investment_target_2022: $investment_target_2022
        investment_target_2023: $investment_target_2023
        investment_target_total: $investment_target_total
        infrastructure_target_2016: $infrastructure_target_2016
        infrastructure_target_2017: $infrastructure_target_2017
        infrastructure_target_2018: $infrastructure_target_2018
        infrastructure_target_2019: $infrastructure_target_2019
        infrastructure_target_2020: $infrastructure_target_2020
        infrastructure_target_2021: $infrastructure_target_2021
        infrastructure_target_2022: $infrastructure_target_2022
        infrastructure_target_2023: $infrastructure_target_2023
        infrastructure_target_total: $infrastructure_target_total
        nep_2016: $nep_2016
        nep_2017: $nep_2017
        nep_2018: $nep_2018
        nep_2019: $nep_2019
        nep_2020: $nep_2020
        nep_2021: $nep_2021
        nep_2022: $nep_2022
        nep_2023: $nep_2023
        nep_total: $nep_total
        gaa_2016: $gaa_2016
        gaa_2017: $gaa_2017
        gaa_2018: $gaa_2018
        gaa_2019: $gaa_2019
        gaa_2020: $gaa_2020
        gaa_2021: $gaa_2021
        gaa_2022: $gaa_2022
        gaa_2023: $gaa_2023
        gaa_total: $gaa_total
        disbursement_2016: $disbursement_2016
        disbursement_2017: $disbursement_2017
        disbursement_2018: $disbursement_2018
        disbursement_2019: $disbursement_2019
        disbursement_2020: $disbursement_2020
        disbursement_2021: $disbursement_2021
        disbursement_2022: $disbursement_2022
        disbursement_2023: $disbursement_2023
        disbursement_total: $disbursement_total
        updates: $updates
        updates_date: $updates_date
      }
    ) {
      id
      title
    }
  }
`;

export const FETCH_PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      title
      pip
      cip
      trip
      rdip
      pcip
      afmip
      gad_score
      project_status_id
      project_status {
        id
        name
      }
      target_start_year
      target_end_year
      implementation_end_date
      implementation_start_date
      operating_unit_id
      operating_unit {
        id
        name
      }
      spatial_coverage_id
      spatial_coverage {
        name
      }
      tier_id
      tier {
        id
        name
      }
      typology_id
      typology {
        id
        name
      }
      cities_municipalities
      implementation_mode_id
      implementation_mode {
        id
      }
      type_id
      type {
        id
        name
      }
      regions {
        id
        name
        pivot {
          target_2016
          target_2017
          target_2018
          target_2019
          target_2020
          target_2021
          target_2022
          target_2023
          target_total
        }
      }
      selected_provinces
      provinces {
        id
        name
      }
      description
      goals
      outcomes
      purpose
      expected_outputs
      clearinghouse
      clearinghouse_date
      estimated_project_life
      financial_benefit_cost_ratio
      financial_internal_rate_return
      financial_net_present_value
      economic_benefit_cost_ratio
      economic_internal_rate_return
      economic_net_present_value
      selected_technical_readinesses
      technical_readinesses {
        id
        name
      }
      neda_submission
      neda_submission_date
      neda_secretariat_review
      neda_secretariat_review_date
      icc_endorsed
      icc_endorsed_date
      icc_approved
      icc_approved_date
      neda_board
      neda_board_date
      total_project_cost
      selected_bases
      bases {
        id
      }
      ten_point_agenda {
        id
      }
      sustainable_development_goals {
        id
      }
      funding_sources {
        id
        name
        pivot {
          target_2016
          target_2017
          target_2018
          target_2019
          target_2020
          target_2021
          target_2022
          target_2023
          target_total
        }
      }
      fs_target_2017
      fs_target_2018
      fs_target_2019
      fs_target_2020
      fs_target_2021
      fs_target_2022
      fs_target_total
      row_target_2017
      row_target_2018
      row_target_2019
      row_target_2020
      row_target_2021
      row_target_2022
      row_target_total
      row_affected_2017
      row_affected_2018
      row_affected_2019
      row_affected_2020
      row_affected_2021
      row_affected_2022
      rap_target_2017
      rap_target_2018
      rap_target_2019
      rap_target_2020
      rap_target_2021
      rap_target_2022
      rap_target_total
      rap_affected_2017
      rap_affected_2018
      rap_affected_2019
      rap_affected_2020
      rap_affected_2021
      rap_affected_2022
      investment_target_2016
      investment_target_2017
      investment_target_2018
      investment_target_2019
      investment_target_2020
      investment_target_2021
      investment_target_2022
      investment_target_2023
      investment_target_total
      infrastructure_target_2016
      infrastructure_target_2017
      infrastructure_target_2018
      infrastructure_target_2019
      infrastructure_target_2020
      infrastructure_target_2021
      infrastructure_target_2022
      infrastructure_target_2023
      infrastructure_target_total
      nep_2016
      nep_2017
      nep_2018
      nep_2019
      nep_2020
      nep_2021
      nep_2022
      nep_2023
      nep_total
      gaa_2016
      gaa_2017
      gaa_2018
      gaa_2019
      gaa_2020
      gaa_2021
      gaa_2022
      gaa_2023
      gaa_total
      disbursement_2016
      disbursement_2017
      disbursement_2018
      disbursement_2019
      disbursement_2020
      disbursement_2021
      disbursement_2022
      disbursement_2023
      disbursement_total
      updates
      updates_date
      selected_districts
      districts {
        id
        name
      }
      created_by
      creator {
        id
        name
      }
      updated_by
      updater {
        id
        name
      }
      created_at
      updated_at
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  query projects($first: Int!, $after: String) {
    projects(first: $first, after: $after) {
      edges {
        node {
          id
          title
          operating_unit {
            name
            image
            acronym
          }
          description
          total_project_cost
          can_update
          creator {
            name
          }
          created_at
          updated_at
        }
      }
      pageInfo {
        total
        count
        currentPage
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const DELETED_PROJECTS_QUERY = gql`
  query projects {
    projects(trashed: ONLY) {
      data {
        id
        title
        operating_unit {
          name
          image
        }
        description
        total_project_cost
      }
      paginatorInfo {
        currentPage
        total
        perPage
        lastPage
      }
    }
  }
`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) {
      id
      title
    }
  }
`;

export const FETCH_DISTRICTS = gql`
  query districts {
    districts {
      id
      name
      province_id
    }
  }
`;

export const FETCH_FUNDING_SOURCES = gql`
  query funding_sources {
    funding_sources {
      id
      name
    }
  }
`;

export const FETCH_OPERATING_UNITS = gql`
  query operating_units {
    operating_units {
      id
      name
    }
  }
`;

export const FETCH_PROJECT_STATUSES = gql`
  query project_statuses {
    project_statuses {
      id
      name
    }
  }
`;

export const FETCH_PROVINCES = gql`
  query provinces {
    provinces {
      id
      name
      region_id
    }
  }
`;

export const FETCH_REGIONS = gql`
  query regions {
    regions {
      id
      name
    }
  }
`;

export const FETCH_SPATIAL_COVERAGES = gql`
  query spatial_coverages {
    spatial_coverages {
      id
      name
    }
  }
`;

export const FETCH_TECHNICAL_READINESSES = gql`
  query technical_readinesses {
    technical_readinesses {
      id
      name
    }
  }
`;

export const FETCH_ROLES = gql`
  query roles {
    roles {
      id
      name
    }
  }
`;

export const FETCH_CONTACTS = gql`
  query {
    contacts {
      id
      user_id
      name
      email
      phone_number
      fax_number
      email
      designation
      operating_unit {
        id
        name
        image
        acronym
      }
      operating_unit_id
    }
  }
`;

export const CREATE_CONTACT_MUTATION = gql`
  mutation createContact(
    $name: String
    $designation: String
    $operating_unit_id: ID
    $email: String
    $phone_number: String
    $fax_number: String
  ) {
    createContact(
      input: {
        name: $name
        designation: $designation
        operating_unit_id: $operating_unit_id
        email: $email
        phone_number: $phone_number
        fax_number: $fax_number
      }
    ) {
      id
      name
      operating_unit {
        id
        name
      }
      designation
      operating_unit_id
      email
      phone_number
      fax_number
    }
  }
`;

export const UPDATE_CONTACT_MUTATION = gql`
  mutation updateContact(
    $id: ID!
    $name: String
    $designation: String
    $operating_unit_id: ID
    $email: String
    $phone_number: String
    $fax_number: String
  ) {
    updateContact(
      input: {
        id: $id
        name: $name
        designation: $designation
        operating_unit_id: $operating_unit_id
        email: $email
        phone_number: $phone_number
        fax_number: $fax_number
      }
    ) {
      id
      name
    }
  }
`;

export const DELETE_CONTACT_MUTATION = gql`
  mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      id
    }
  }
`;

export const FETCH_ACTIVITIES = gql`
  query {
    me {
      activities {
        id
        description
        properties
        subject {
          id
          name
          title
        }
        causer {
          id
          name
        }
        created_at
        updated_at
      }
    }
  }
`;
