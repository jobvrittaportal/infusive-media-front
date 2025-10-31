import { gql } from '@apollo/client';

export const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
      name
      active
      permissions {
        id
        feature
        permissions {
          # ✅ This is correct - permissions field contains the PermissionObject
          read
          upsert
          delete
        }
      }
    }
  }
`;
