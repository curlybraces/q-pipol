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
    image_url
    contact_number
    role {
      id
      name
    }
  }
`;

export const NOTIFICATION_FRAGMENT = gql`
  fragment notification on Notification {
    id
    type
    notifiable_id
    notifiable_type
    notifiable {
      name
    }
    data {
      id
      from
      title
      message
    }
    read_at
    created_at
    updated_at
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
    total_project_cost
    submission_status_id
    submission_status {
      id
      name
    }
    creator {
      id
      name
    }
    created_at
    updated_at
  }
`;