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