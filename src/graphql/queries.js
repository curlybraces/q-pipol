import gql from 'graphql-tag';
import { USER_FRAGMENT, NOTIFICATION_FRAGMENT } from './fragments';

/* Auth */
export const CHECK_EMAIL_AVAILABILITY_QUERY = gql`
  query checkEmailAvailability($email: String!) {
    checkEmailAvailability(email: $email) {
      message
      status
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
      ...user
      project_count
    }
  }
  ${USER_FRAGMENT}
`;

export const GET_IMAGES = gql`
  query images {
    images {
      id
      name
      dropbox_link
      size
    }
  }
`;

/* Notifications */

export const FETCH_NOTIFICATIONS_QUERY = gql`
  query notifications {
    notifications {
      ...notificationDetails
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

export const FETCH_UNREAD_NOTIFICATIONS_QUERY = gql`
  query unreadNotifications {
    unreadNotifications {
      ...notificationDetails
    }
  }
  ${NOTIFICATION_FRAGMENT}
`;

/* Options */

export const FETCH_CURRENCIES = gql`
  query currencies {
    currencies {
      id
      name
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

export const FETCH_FUNDING_INSTITUTIONS = gql`
  query funding_institutions {
    funding_institutions {
      id
      name
    }
  }
`;

export const FETCH_OPERATING_UNITS = gql`
  query operating_units {
    operating_units {
      id
      operating_unit_type_id
      operating_unit_type {
        id
        name
      }
      name
      acronym
      agency_head_name
      agency_head_designation
      telephone_number
      fax_number
      email
      image
      focals {
        id
        name
        email
        position
        active
        verified
        image_url
      }
      reviewers {
        id
        name
      }
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

export const FETCH_TIERS = gql`
  query {
    tiers {
      id
      name
    }
  }
`;

export const FETCH_TYPES = gql`
  query {
    types {
      id
      name
    }
  }
`;

export const FETCH_TYPOLOGIES = gql`
  query {
    typologies {
      id
      name
    }
  }
`;

export const FETCH_BASES = gql`
  query {
    bases {
      id
      name
    }
  }
`;

export const FETCH_IMPLEMENTATION_MODES = gql`
  query {
    implementation_modes {
      id
      name
    }
  }
`;

export const FETCH_YEARS = gql`
  query {
    years {
      id
      name
    }
  }
`;

export const FETCH_CITY_MUNICIPALITIES_QUERY = gql`
  query city_municipalities {
    city_municipalities {
      id
      name
    }
  }
`;

/* Contacts */

export const FETCH_CONTACTS = gql`
  query {
    contacts {
      id
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

/* Resources */

export const FETCH_RESOURCES_QUERY = gql`
  query {
    resources {
      id
      title
      description
      url
      image_url
      document_type
      adder {
        name
      }
      updater {
        name
      }
      deleter {
        name
      }
      created_at
      updated_at
    }
  }
`;

/* Users */

export const ALL_USERS = gql`
  query users {
    users {
      ...user
      reviews {
        id
        acronym
      }
      created_at
    }
  }
  ${USER_FRAGMENT}
`;

export const FETCH_REVIEWERS_QUERY = gql`
  query reviewers {
    reviewers {
      id
      name
      reviews {
        id
        projects {
          id
        }
      }
    }
  }
`;

export const FETCH_ENCODERS_QUERY = gql`
  query encoders {
    encoders {
      id
      name
      operating_unit {
        id
        acronym
      }
      image_url
    }
  }
`;

/* Projects */

// This query fetches all projects at once, not ideal esp if you have a long list
export const GET_PROJECTS = gql`
  query projects {
    projects {
      id
      title
      operating_unit {
        name
        image
        acronym
      }
      description
      main_funding_source_id
      main_funding_source {
        id
        name
      }
      total_project_cost
      can_update
      creator {
        name
      }
      created_at
      updated_at
    }
  }
`;

export const RELAY_PROJECTS_QUERY = gql`
  query relayProjects($first: Int!, $after: String) {
    relayProjects(first: $first, after: $after) {
      pageInfo {
        hasNextPage
        endCursor
        total
      }
      edges {
        node {
          id
          title
          operating_unit {
            id
            name
            image
            acronym
          }
          description
          spatial_coverage {
            id
            name
          }
          target_start_year
          target_end_year
          currency {
            id
            name
          }
          total_project_cost
          creator {
            id
            name
          }
          created_at
          updated_at
        }
      }
    }
  }
`;

export const PAGINATED_PROJECTS = gql`
  query paginatedProjects($first: Int!, $page: Int) {
    paginatedProjects(first: $first, page: $page) {
      data {
        id
        title
        operating_unit {
          id
          name
          image
          acronym
        }
        description
        spatial_coverage {
          id
          name
        }
        target_start_year
        target_end_year
        currency {
          id
          name
        }
        total_project_cost
        creator {
          id
          name
        }
        created_at
        updated_at
      }
      paginatorInfo {
        currentPage
        lastPage
        total
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

export const FETCH_PROJECT_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      afmip
      bases {
        id
        name
      }
      beneficiaries
      cities_municipalities
      cip
      city_municipality_id
      city_municipality {
        id
        name
      }
      clearinghouse
      clearinghouse_date
      creator {
        id
        name
      }
      created_at
      currency_id
      currency {
        id
        name
      }
      components
      description
      disbursement_2016
      disbursement_2017
      disbursement_2018
      disbursement_2019
      disbursement_2020
      disbursement_2021
      disbursement_2022
      disbursement_2023
      disbursement_total
      district_id
      district {
        id
        name
      }
      employment_generated
      estimated_project_life
      economic_benefit_cost_ratio
      economic_internal_rate_return
      economic_net_present_value
      expected_outputs
      financial_benefit_cost_ratio
      financial_internal_rate_return
      financial_net_present_value
      fs_target_2017
      fs_target_2018
      fs_target_2019
      fs_target_2020
      fs_target_2021
      fs_target_2022
      fs_target_total
      funding_institution_id
      funding_institution {
        id
        name
      }
      funding_source_financials {
        id
        funding_source_id
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
      gaa_2016
      gaa_2017
      gaa_2018
      gaa_2019
      gaa_2020
      gaa_2021
      gaa_2022
      gaa_2023
      gaa_total
      gad_id
      gad {
        id
        name
      }
      goals
      has_fs
      has_rap
      has_row
      icc_approved
      icc_approved_date
      icc_endorsed
      icc_endorsed_date
      image_url
      implementation_start_date
      implementation_end_date
      implementation_mode_id
      implementation_mode {
        id
        name
      }
      implementation_risk
      income_increase
      infrastructure
      infrastructure_target_2016
      infrastructure_target_2017
      infrastructure_target_2018
      infrastructure_target_2019
      infrastructure_target_2020
      infrastructure_target_2021
      infrastructure_target_2022
      infrastructure_target_2023
      infrastructure_target_total
      investment_target_2016
      investment_target_2017
      investment_target_2018
      investment_target_2019
      investment_target_2020
      investment_target_2021
      investment_target_2022
      investment_target_2023
      investment_target_total
      main_funding_source_id
      main_funding_source {
        id
        name
      }
      mitigation_strategy
      neda_board
      neda_board_date
      neda_submission
      neda_submission_date
      neda_secretariat_review
      neda_secretariat_review_date
      nep_2016
      nep_2017
      nep_2018
      nep_2019
      nep_2020
      nep_2021
      nep_2022
      nep_2023
      nep_total
      operating_unit_id
      operating_unit {
        id
        name
      }
      outcomes
      pcip
      pip
      priority_ranking
      project_status_id
      project_status {
        id
        name
      }
      province_id
      province {
        id
        name
      }
      provinces {
        id
        name
      }
      purpose
      rap_affected_2017
      rap_affected_2018
      rap_affected_2019
      rap_affected_2020
      rap_affected_2021
      rap_affected_2022
      rap_target_2017
      rap_target_2018
      rap_target_2019
      rap_target_2020
      rap_target_2021
      rap_target_2022
      rap_target_total
      rdip
      region_id
      regions {
        id
      }
      region_financials {
        id
        region_id
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
      row_affected_2017
      row_affected_2018
      row_affected_2019
      row_affected_2020
      row_affected_2021
      row_affected_2022
      row_target_2017
      row_target_2018
      row_target_2019
      row_target_2020
      row_target_2021
      row_target_2022
      row_target_total
      selected_regions
      spatial_coverage_id
      spatial_coverage {
        id
        name
      }
      target_end_year
      target_start_year
      technical_readinesses {
        id
        name
      }
      tier_id
      tier {
        id
        name
      }
      title
      total_project_cost
      trip
      type_id
      type {
        id
        name
      }
      updates
      updates_date
      updated_at
      latest_processing_status {
        id
        processing_status {
          id
          name
        }
      }
      latest_status
    }
  }
`;

export const SEARCH_PROJECTS = gql`
  query searchProjects($search: String!) {
    searchProjects(search: $search) {
      id
      title
    }
  }
`;

/* Activities */

export const FETCH_ACTIVITIES = gql`
  query {
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
`;

/* Fetch GAD Questions */

export const FETCH_GAD_QUESTIONS = gql`
  query {
    gad_questions {
      id
      name
      gad_subquestions {
        id
        name
        gad_choices {
          id
          name
          value
        }
      }
    }
  }
`;

export const FETCH_GADS_QUERY = gql`
  query {
    gads {
      id
      name
    }
  }
`;

export const FETCH_REVIEW_QUERY = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      selected_sustainable_development_goals
      sustainable_development_goals {
        id
        name
      }
      selected_ten_point_agenda
      ten_point_agenda {
        id
        name
      }
      selected_paradigms
      paradigms {
        id
        name
      }
      selected_pdp_chapters
      pdp_chapters {
        id
        name
      }
      selected_pdp_indicators
      pdp_indicators {
        id
        name
      }
      selected_bases
      bases {
        id
        name
      }
      review {
        id
        typology_id
        cip_type_id
        cip_type {
          id
        }
        trip
        cip
        within_period
        readiness_id
        readiness {
          id
        }
        reviewer {
          id
        }
      }
    }
  }
`;
