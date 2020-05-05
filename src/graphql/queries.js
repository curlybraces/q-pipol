import gql from 'graphql-tag';
import {
  USER_FRAGMENT,
  BASIC_INFORMATION_FRAGMENT,
  NOTIFICATION_FRAGMENT
} from './fragments';

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
    }
  }
  ${USER_FRAGMENT}
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

/* Projects */

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

export const INFINITE_SCROLL_PROJECTS = gql`
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
        total_project_cost
        can_update
        creator {
          id
          name
        }
        created_at
        updated_at
      }
      paginatorInfo {
        count
        currentPage
        firstItem
        lastItem
        hasMorePages
        lastItem
        lastPage
        perPage
        total
      }
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
          ...basicInformation
        }
      }
    }
  }
  ${BASIC_INFORMATION_FRAGMENT}
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
      pip
      cip
      trip
      rdip
      pcip
      afmip
      title
      type_id
      type {
        id
        name
      }
      infrastructure
      operating_unit_id
      main_funding_source_id
      main_funding_source {
        id
        name
      }
      funding_institution_id
      funding_institution {
        id
        name
      }
      implementation_mode_id
      implementation_mode {
        id
        name
      }
      priority_ranking
      project_status_id
      project_status {
        id
        name
      }
      typology_id
      typology {
        id
        name
      }
      tier_id
      tier {
        id
        name
      }
      spatial_coverage_id
      spatial_coverage {
        id
        name
      }
      cities_municipalities
      description
      components
      goals
      outcomes
      purpose
      expected_outputs
      beneficiaries
      employment_generated
      target_start_year
      target_end_year
      implementation_start_date
      implementation_end_date
      clearinghouse
      clearinghouse_date
      has_row
      has_rap
      has_fs
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
      currency_id
      implementation_risk
      mitigation_strategy
      income_increase
      gad_score
      estimated_project_life
      financial_benefit_cost_ratio
      financial_internal_rate_return
      financial_net_present_value
      economic_benefit_cost_ratio
      economic_internal_rate_return
      economic_net_present_value
      funding_sources {
        id
      }
      ten_point_agenda {
        id
      }
      sustainable_development_goals {
        id
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
      image_url
      updates
      updates_date
      districts {
        id
      }
      bases {
        id
      }
      regions {
        id
      }
      provinces {
        id
      }
      technical_readinesses {
        id
      }
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
  }`;
