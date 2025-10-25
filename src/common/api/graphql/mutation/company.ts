// src/graphql/companies.ts
import { gql } from "@apollo/client";

export const GET_CONTACT_PERSONS = gql`
  query GetContactPersons {
    contactPersons {
      id
      name
      email
      phone
    }
  }
`;

export const GET_COMPANY = gql`
  query Company($id: Int!) {
    company(id: $id) {
      id
      name
      address
      email
    }
  }
`;

export const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CreateCompanyDto!) {
    createCompany(input: $input) {
      id
      name
      address
      email
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany($input: UpdateCompanyDto!) {
    updateCompany(input: $input) {
      id
      name
      address
      email
    }
  }
`;

export const REMOVE_COMPANY = gql`
  mutation RemoveCompany($id: Int!) {
    removeCompany(id: $id)
  }
`;
