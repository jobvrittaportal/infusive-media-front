import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
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
`;
