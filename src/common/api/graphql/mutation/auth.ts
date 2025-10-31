import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        firstName
        lastName
        email
        roles {
          id
          name
          active
          permissions {
            id
            feature
            permissions {
              read
              upsert
              delete
            }
          }
        }
      }
    }
  }
`;
