import { gql } from "@apollo/client";

export const UPSERT_ROLE = gql`
  mutation UpsertRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      id
      name
      active
    }
  }
`;
