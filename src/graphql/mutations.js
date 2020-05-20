import gql from 'graphql-tag';

/* Auth */ 

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      access_token
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      status
      message
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

export const RESEND_EMAIL_VERIFICATION_MUTATION = gql`
  mutation resendEmailVerification($email: String!) {
    resendEmailVerification(input: { email: $email }) {
      message
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(input: { token: $token }) {
      access_token
    }
  }
`;

export const UPDATE_PASSWORD_MUTATION = gql`
  mutation updatePassword(
    $old_password: String!
    $password: String!
    $password_confirmation: String!
  ) {
    updatePassword(
      input: {
        old_password: $old_password
        password: $password
        password_confirmation: $password_confirmation
      }
    ) {
      status
      message
    }
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(input: { email: $email }) {
      status
      message
    }
  }
`;

/* Profile */
export const UPLOAD_USER_AVATAR_MUTATION = gql`
  mutation uploadUserAvatar($image: Upload!) {
    uploadUserAvatar(image: $image) {
      id
      image_url
    }
  }
`;

export const CHOOSE_AVATAR_MUTATION = gql`
  mutation chooseAvatar($image_id: ID!) {
    chooseAvatar(image_id: $image_id) {
      id
      avatar
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
      name
      operating_unit_id
      position
      contact_number
      operating_unit {
        id
        name
        image
      }
    }
  }
`;

/* Notifications */

export const MARK_AS_READ_MUTATION = gql`
  mutation markAsRead($id: ID!) {
    markAsRead(id: $id) {
      id
    }
  }
`;

export const MARK_ALL_AS_READ_MUTATION = gql`
  mutation markAllAsRead {
    markAllAsRead {
      status
    }
  }
`;

/* Resources */

export const CREATE_RESOURCE_MUTATION = gql`
  mutation createResource(
    $title: String
    $description: String
    $url: String
    $image_url: String
    $document_type: String
  ) {
    createResource(
      input: {
        title: $title
        description: $description
        url: $url
        image_url: $image_url
        document_type: $document_type
      }
    ) {
      id
      title
      description
      url
      image_url
      document_type
      adder {
        name
      }
      created_at
      updated_at
    }
  }
`;

export const DELETE_RESOURCE_MUTATION = gql`
  mutation deleteResource($id: ID!) {
    deleteResource(id: $id) {
      id
      title
    }
  }
`;

/* Contacts */

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
      designation
      operating_unit_id
      operating_unit {
        id
        name
        image
        acronym
      }
      email
      phone_number
      fax_number
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

/* Users */

export const ASSIGN_OPERATING_UNIT_TO_REVIEW_MUTATION = gql`
  mutation assignOperatingUnitToReview($user_id: ID!, $operating_units: [ID]!) {
    assignOperatingUnitToReview(
      user_id: $user_id
      operating_units: $operating_units
    ) {
      id
      reviews {
        id
        name
      }
    }
  }
`;

export const ASSIGN_ROLE_MUTATION = gql`
  mutation assignRole($user_id: ID!, $role_id: ID) {
    assignRole(user_id: $user_id, role_id: $role_id) {
      id
      role {
        id
        name
      }
      reviews {
        id
        acronym
      }
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

/* Operating Units */

export const UPDATE_OPERATING_UNIT_MUTATION = gql`
  mutation updateOperatingUnit(
    $id: ID!
    $name: String!
    $acronym: String!
    $image: String
    $agency_head_name: String
    $agency_head_designation: String
    $telephone_number: String
    $fax_number: String
    $email: String
  ) {
    updateOperatingUnit(
      id: $id
      name: $name
      acronym: $acronym
      image: $image
      agency_head_name: $agency_head_name
      agency_head_designation: $agency_head_designation
      telephone_number: $telephone_number
      fax_number: $fax_number
      email: $email
    ) {
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

export const UPDATE_OPERATING_UNIT_IMAGE = gql`
  mutation updateOperatingUnitImage($id: ID!, $image: Upload!) {
    updateOperatingUnitImage(id: $id, image: $image) {
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

/* Projects */

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
    $infrastructure: Boolean
    $operating_unit_id: ID
    $main_funding_source_id: ID
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
	  $currency_id: ID
    $total_project_cost: Float
    $implementation_risk: String
    $mitigation_strategy: String
    $income_increase: String
    $gad_id: ID
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
        infrastructure: $infrastructure
        operating_unit_id: $operating_unit_id
        main_funding_source_id: $main_funding_source_id
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
	      currency_id: $currency_id
        total_project_cost: $total_project_cost
        implementation_risk: $implementation_risk
        mitigation_strategy: $mitigation_strategy
        income_increase: $income_increase
        gad_id: $gad_id
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
      operating_unit {
	      id
        name
        image
        acronym
      }
      spatial_coverage {
	      id
        name
      }
      main_funding_source {
        id
        name
      }
      description
      target_start_year
      target_end_year
	    currency_id
	    currency {
		    id
		    name
	    }
      total_project_cost
      can_update
      creator {
	      id
        name
      }
      created_at
      updated_at
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
    $infrastructure: Boolean
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
	  $region_id: ID
    $regions: UpdateRegionRelation
	  $province_id: ID
    $provinces: UpdateProvinceRelation
	  $district_id: ID
    $districts: UpdateDistrictInput
	  $city_municipality_id: ID
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
	  $currency_id: ID
    $total_project_cost: Float
    $implementation_risk: String
    $mitigation_strategy: String
    $income_increase: String
    $gad_id: ID
    $estimated_project_life: String
    $financial_benefit_cost_ratio: Float
    $financial_internal_rate_return: Float
    $financial_net_present_value: Float
    $economic_benefit_cost_ratio: Float
    $economic_internal_rate_return: Float
    $economic_net_present_value: Float
    $technical_readinesses: UpdateTechnicalReadinessesInput
    $main_funding_source_id: ID
	  $funding_institution_id: ID
	  $has_fs: Boolean
    $fs_target_2017: Float
    $fs_target_2018: Float
    $fs_target_2019: Float
    $fs_target_2020: Float
    $fs_target_2021: Float
    $fs_target_2022: Float
    $fs_target_total: Float
	  $has_row: Boolean
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
	  $has_rap: Boolean
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
	  $region_financials: UpdateRegionFinancialsHasMany
    $funding_source_financials: UpdateFundingSourceFinancialsHasMany
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
        infrastructure: $infrastructure
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
	      region_id: $region_id
        regions: $regions
	      province_id: $province_id
        provinces: $provinces
	      district_id: $district_id
        districts: $districts
	      city_municipality_id: $city_municipality_id
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
      	currency_id: $currency_id
        total_project_cost: $total_project_cost
        implementation_risk: $implementation_risk
        mitigation_strategy: $mitigation_strategy
        income_increase: $income_increase
        gad_id: $gad_id
        estimated_project_life: $estimated_project_life
        financial_benefit_cost_ratio: $financial_benefit_cost_ratio
        financial_internal_rate_return: $financial_internal_rate_return
        financial_net_present_value: $financial_net_present_value
        economic_benefit_cost_ratio: $economic_benefit_cost_ratio
        economic_internal_rate_return: $economic_internal_rate_return
        economic_net_present_value: $economic_net_present_value
        technical_readinesses: $technical_readinesses
	      main_funding_source_id: $main_funding_source_id
	      funding_institution_id: $funding_institution_id
		    has_fs: $has_fs
        fs_target_2017: $fs_target_2017
        fs_target_2018: $fs_target_2018
        fs_target_2019: $fs_target_2019
        fs_target_2020: $fs_target_2020
        fs_target_2021: $fs_target_2021
        fs_target_2022: $fs_target_2022
        fs_target_total: $fs_target_total
        has_row: $has_row
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
	      has_rap: $has_rap
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
	      region_financials: $region_financials
        funding_source_financials: $funding_source_financials
      }
    ) {
        id
        title
        pip
        cip
        trip
        rdip
        pcip
        afmip
        gad_id
        project_status_id
        target_start_year
        target_end_year
        implementation_end_date
        implementation_start_date
        operating_unit_id
        main_funding_source_id
        funding_institution_id
        spatial_coverage_id
        tier_id
        typology_id
		    infrastructure
        cities_municipalities
        implementation_mode_id
        type_id
		    region_id
        selected_regions
		    province_id
        selected_provinces
		    district_id
		    city_municipality_id
        description
        goals
        outcomes
        purpose
        expected_outputs
		    beneficiaries
		    mitigation_strategy
		    implementation_risk
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
        currency_id
        total_project_cost
        selected_bases
		    has_fs
        fs_target_2017
        fs_target_2018
        fs_target_2019
        fs_target_2020
        fs_target_2021
        fs_target_2022
        fs_target_total
		    has_row
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
		    has_rap
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
        creator {
            id
            name
        }
        updater {
            id
            name
        }
        created_at
        updated_at
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
        }
    }
  }
`;

export const ASSESS_GAD_RESPONSIVENESS = gql`
  mutation assessGadResponsiveness(
    $id: ID!
    $project_gad_subquestions: UpdateProjectGadSubquestionHasMany
  ) {
    assessGadResponsiveness(
      input: {
        id: $id
        project_gad_subquestions: $project_gad_subquestions
      }
    ) {
      id
      project_gad_subquestions {
        id
        gad_subquestion_id
        gad_choice_id
      }
    }
  }
`;

export const ENDORSE_PROJECTS_MUTATION = gql`
  mutation endorseProjects(
	  $projects: [ID!]!
    $file: Upload!
  ) {
    endorseProjects(
      projects: $projects
      file: $file
    ) {
      id
      file_name
      file_path
      file_size
      file_type
      dropbox_link
      projects {
        id
	      title
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

export const REVIEW_PROJECT_MUTATION = gql`
  mutation reviewProject(
    $id: ID!
    $ten_point_agenda: UpdateTenPointAgendaRelation
    $sustainable_development_goals: UpdateSustainableDevelopmentGoalRelation
    $paradigms: UpdateParadigmsRelation
    $pdp_chapters: UpdatePdpChaptersRelation
    $pdp_indicators: UpdatePdpIndicatorsRelation
    $bases: UpdateBasisRelation
    $review: ProjectReviewBelongsTo
  ) {
    reviewProject(
      input: {
        id: $id
        ten_point_agenda: $ten_point_agenda
        sustainable_development_goals: $sustainable_development_goals
        paradigms: $paradigms
        pdp_chapters: $pdp_chapters
        pdp_indicators: $pdp_indicators
        bases: $bases
        review: $review
      }
    ) {
      id
      selected_sustainable_development_goals
      sustainable_development_goals {
        id
      }
      selected_ten_point_agenda
      ten_point_agenda {
        id
      }
      selected_paradigms
      paradigms {
        id
      }
      selected_pdp_chapters
      pdp_chapters {
        id
      }
      selected_pdp_indicators
      pdp_indicators {
        id
      }
      selected_bases
      bases {
        id
      }
      review {
        id
        cip_type {
          id
        }
        trip
        cip
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

export const PROCESS_PROJECT_MUTATION = gql`
  mutation processProject(
    $project_id: ID!
    $processing_status_id: ID!
    $remarks: String
  ) {
    processProject(
      project_id: $project_id
      processing_status_id: $processing_status_id
      remarks: $remarks
    ) {
      id
      project_processing_statuses {
        processing_status_id
        processing_status {
          id
        }
        processed_by
        processor {
          id
        }
        remarks
        processed_at
        created_at
        updated_at
      }
    }
  }
`;


export const TRANSFER_PROJECT_MUTATION = gql`
  mutation transferProject(
    $project_id: ID!
    $user_id: ID!
  ) {
    transferProject(
      project_id: $project_id
      user_id: $user_id
    ) {
      project {
        id
        title
      }
      message
      status
    }
  }
`