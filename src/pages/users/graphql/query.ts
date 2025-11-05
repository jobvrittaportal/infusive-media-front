import { gql } from '@apollo/client';

export const GET_ROLES = gql`
  query GetRoles($query: String) {
    roles(query: $query) {
      id
      name
    }
  }
`;

// graphql/queries/user.queries.ts

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    currentUser {
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

export const GET_USERS = gql`
  query GetUsers {
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

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      firstName
      lastName
      email
      mobile
      altMobile
      altEmail
      roles {
        id
        name
        active
        
      }
    }
  }
`;
