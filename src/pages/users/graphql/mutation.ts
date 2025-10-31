import { gql } from '@apollo/client';

// Create new user
export const CREATE_USER_MUTATION = gql`
  mutation RegisterUser($input: CreateUserInput!) {
    registerUser(input: $input) {
      id
      firstName
      lastName
      email
      mobile
      altEmail
      altMobile
      userType
    }
  }
`;
