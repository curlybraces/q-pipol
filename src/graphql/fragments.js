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
