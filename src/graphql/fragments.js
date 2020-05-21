import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment user on User {
    id
    name
    email
    position
    verified
    operating_unit_id
    operating_unit {
      id
      image
      name
    }
    avatar
    contact_number
    role {
      id
      name
    }
  }
`;

export const BASIC_INFORMATION_FRAGMENT = gql`
  fragment basicInformation on Project {
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
`;

export const NOTIFICATION_FRAGMENT = gql`
  fragment notificationDetails on Notification {
    id
    type
    notifiable_id
    notifiable_type
    notifiable {
      name
    }
    data {
      type
      from
      title
      body
      actionText
      actionUrl
    }
    read_at
    created_at
    updated_at
  }
`;

export const PROJECT_FRAGMENT = gql`
  {
    fragment
    projectDetails
    on
    Project {
      id
      uuid
      pip
      cip
      trip
      rdip
      pcip
      afmip
      type_id
      type {
        id
        name
      }
      infrastructure
      title
      operating_unit {
        id
        name
      }
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
      operating_unit_id
      operating_unit {
        id
        name
      }
      spatial_coverage_id
      spatial_coverage {
        id
        name
      }
      bases {
        id
        name
      }
      selected_bases
      description
      components
      goals
      outcomes
      purpose
      expected_outputs
      clearinghouse
      clearinghouse_date
      target_start_year
      target_end_year
      implementation_start_date
      implementation_end_date
      typology {
        id
        name
      }
      typology_id
      gad_score
      type_id
      type {
        id
        name
      }
      region_id
      region {
        id
        name
      }
      province_id
      province {
        id
        name
      }
      district_id
      district {
        id
        name
      }
      city_municipality_id
      city_municipality {
        id
        name
      }
      districts {
        id
        name
      }
      selected_districts
      cities_municipalities
      total_project_cost
      currency_id
      currency {
        id
        name
      }
      updates
      updates_date
      project_status_id
      project_status {
        id
        name
      }
      tier_id
      tier {
        id
        name
      }
      estimated_project_life
      financial_benefit_cost_ratio
      financial_internal_rate_return
      financial_net_present_value
      economic_benefit_cost_ratio
      economic_internal_rate_return
      economic_net_present_value
      technical_readinesses {
        id
        name
      }
      selected_technical_readinesses
      implementation_mode_id
      implementation_mode {
        id
        name
      }
      funding_sources {
        id
        name
      }
      paradigms {
        id
      }
      ten_point_agenda {
        id
        name
      }
      sustainable_development_goals {
        id
        name
      }
      regions {
        id
        name
      }
      selected_regions
      provinces {
        id
        name
      }
      selected_provinces
      has_row
      has_rap
      has_fs
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
      priority_ranking
      income_increase
      beneficiaries
      employment_generated
      implementation_risk
      mitigation_strategy
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
      deleted_by
      deleter {
        id
        name
      }
      can_update
      project_processing_statuses {
        id
        processing_status {
          id
          name
        }
        processor {
          id
          name
        }
      }
      activities {
        id
        subject {
          id
          name
        }
        created_at
      }
      endorsed_by
      endorser {
        id
        name
      }
      endorsed_at
      endorsement {
        id
        file_path
      }
      endorsement_id
      reviewer {
        id
        name
      }
      reviewed_by
      reviewed_at
      created_at
      updated_at
      finalized_by
      finalizer {
        id
        name
      }
      finalized_at
      approved_by
      approved_at
      createdAt
      updatedAt
      finalizedAt
      reviewedAt
      endorsedAt
      deletedAt
      project_processing_statuses {
        id
        processing_status {
          id
          name
        }
      }
      latest_processing_status {
        id
        processing_status {
          id
          name
        }
      }
      project_gad_subquestions {
        id
        gad_subquestion {
          id
          name
        }
        gad_choice {
          id
          name
          value
        }
      }
    }
  }
`;
