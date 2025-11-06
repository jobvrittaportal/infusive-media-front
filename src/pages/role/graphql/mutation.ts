import { gql } from "@apollo/client";

export const UPSERT_ROLE = gql`
  mutation UpsertRole($input: CreateRoleInput!) {
    createRole(input: $input) {
      name
      active
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation UpdateRole($id: ID!, $input: UpdateRoleInput!){
    updateRole(id: $id, input: $input){
      id
      name
      active
    }
  }
`;