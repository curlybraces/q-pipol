import { gql } from 'apollo-boost';

/* Auth */
export const CHECK_EMAIL_AVAILABILITY_QUERY = gql`
  query checkEmailAvailability($email: String!) {
    checkEmailAvailability(email: $email) {
      message
      status
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      id
      name
      email
      position
      verified
      operating_unit_id
      operating_unit {
        id
        image
      }
      contact_number
      role {
        name
      }
      image_url
    }
  }
`;

/* Notifications */

export const FETCH_NOTIFICATIONS_QUERY = gql`
  query me {
    me {
      id
      name
      email
      position
      verified
      operating_unit_id
      operating_unit {
        id
        image
      }
      contact_number
      role {
        name
      }
      image_url
      notifications {
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
    }
  }
`;

export const FETCH_UNREAD_NOTIFICATIONS_QUERY = gql`
  query me {
    me {
      id
      unreadNotifications {
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
    }
  }
`;

/* Options */

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

export const FETCH_OPERATING_UNITS = gql`
  query operating_units {
    operating_units {
      id
      name
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

export const FETCH_TYPOLOGIES = gql`
  query {
    typologies {
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
      user_id
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
      id
      name
      email
      position
      active
      verified
      image_url
      operating_unit {
        name
      }
      role {
        id
        name
      }
      reviews {
        id
        acronym
      }
      created_at
    }
  }
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

export const ALL_PROJECTS_QUERY = gql`
  query projects($first: Int!, $after: String) {
    projects(first: $first, after: $after) {
      edges {
        node {
          id
          title
          operating_unit {
            name
            image
            acronym
          }
          description
          total_project_cost
          can_update
          creator {
            name
          }
          created_at
          updated_at
        }
      }
      pageInfo {
        total
        count
        currentPage
        endCursor
        startCursor
        hasNextPage
        hasPreviousPage
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

/* Activities */

export const FETCH_ACTIVITIES = gql`
  query {
    me {
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
  }
`;
