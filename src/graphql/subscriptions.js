import gql from 'graphql-tag'
import {
  BASIC_INFORMATION_FRAGMENT
} from './fragments';

export const ASSIGNED_ROLE = gql`subscription assignedRole($user_id: ID) {
	assignedRole(user_id: $user_id) {
		id
		role {
			id
			name
		}
	}
}`;

export const ASSIGNED_OPERATING_UNIT_TO_REVIEW = gql`
	subscription assignedOperatingUnitToReview($user_id: ID) {
		assignedOperatingUnitToReview(user_id: $user_id) {
			id
			reviews {
				id
				acronym
			}
		}
	}
`;

// this will return basic information of project making it possible to append it to the list of projects.
export const TRANSFERRED_PROJECT = gql`
	subscription transferredProject($user_id: ID) {
		transferredProject(user_id: $user_id) {
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
`;