import gql from 'graphql-tag'

export const ASSIGNED_ROLE = gql`subscription assignRole($user_id: ID) {
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