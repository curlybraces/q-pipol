import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      user {
        id
        name
        email
        roles {
          name
        }
        profile {
          operating_unit {
            id
            name
            image
          }
          position
          unit
        }
        notifications
        unreadNotifications
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
  mutation activateUser($id: ID!, $active: Boolean!) {
    activateUser(input: { id: $id, active: $active }) {
      user {
        id
        active
      }
      status
      message
    }
  }
`;

export const ME = gql`
  query me {
    me {
      name
      email
      profile {
        operating_unit {
          name
          image
        }
        unit
        position
      }
      roles {
        name
      }
    }
  }
`;

export const ALL_USERS = gql`
  query users($page: Int!) {
    users(page: $page) {
      data {
        id
        name
        email
        active
        roles {
          id
          name
        }
        created_at
      }
      paginatorInfo {
        currentPage
        lastPage
        total
      }
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
    $title: String!
    $type_id: ID
    $operating_unit_id: Int
    $implementation_mode_id: Int
    $project_status_id: Int
    $typology_id: Int
    $tier_id: Int
    $spatial_coverage_id: ID
    $cities_municipalities: String
    $rdip: Boolean
    $pcip: Boolean
    $description: String
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
    $ten_point_agenda: CreateTenPointAgendaRelation
    $bases: CreateBasisRelation
    $sustainable_development_goals: CreateSustainableDevelopmentGoalRelation
    $regions: CreateRegionRelation
    $provinces: CreateProvinceRelation
    $funding_sources: CreateFundingSourceRelation
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
        title: $title
        type_id: $type_id
        operating_unit_id: $operating_unit_id
        implementation_mode_id: $implementation_mode_id
        project_status_id: $project_status_id
        typology_id: $typology_id
        tier_id: $tier_id
        spatial_coverage_id: $spatial_coverage_id
        cities_municipalities: $cities_municipalities
        rdip: $rdip
        pcip: $pcip
        description: $description
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
        bases: $bases
        ten_point_agenda: $ten_point_agenda
        regions: $regions
        provinces: $provinces
        sustainable_development_goals: $sustainable_development_goals
        funding_sources: $funding_sources
        updates: $updates
        updates_date: $updates_date
      }
    ) {
      id
      pip
      cip
      trip
      rdip
      pcip
      gad_score
      spatial_coverage {
        name
      }
      cities_municipalities
      implementation_mode {
        id
      }
      regions {
        id
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
      provinces {
        id
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
      neda_submission
      neda_submission_date
      neda_secretariat_review
      neda_secretariat_review_date
      neda_board
      neda_board_date
      icc_endorsed
      icc_endorsed_date
      icc_approved
      icc_approved_date
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
      updates
      updates_date
      created_by {
        name
      }
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
      gad_score
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
      provinces {
        id
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
      created_by {
        name
      }
    }
  }
`;

export const ALL_PROJECTS_QUERY = gql`
  query projects($page: Int!) {
    projects(page: $page) {
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
        total
        count
        perPage
        currentPage
        lastPage
      }
    }
  }
`;

export const UPDATE_PROJECT_MUTATION = gql`
  mutation updateProject($id: ID!, $title: String) {
    updateProject(input: { id: $id, title: $title }) {
      id
      title
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
