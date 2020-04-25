import gql from 'graphql-tag';

/* Fragments */

const USER_FRAGMENT = gql`
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


/* Queries */

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
      unreadNotifications {
        id
      }
    }
  }
  ${USER_FRAGMENT}
`;

/* Mutations */