import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      user {
        id
        name
        email
        roles {
          name
        }
        profile {
          operating_unit {
            id
            name
            image
          }
          position
          unit
        }
      }
      access_token
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
