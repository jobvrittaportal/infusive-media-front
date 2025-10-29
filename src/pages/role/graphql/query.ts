import { gql } from "@apollo/client";

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      active
      permissions {
        feature
        permissions {
          read
          upsert
          delete
        }
      }
    }
  }
`;
