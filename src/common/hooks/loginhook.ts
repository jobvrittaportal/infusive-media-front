import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
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

export function useLogin() {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const loginUser = async (email: string, password: string) => {
    return login({
      variables: { input: { email, password } },
    });
  };

  return { login: loginUser, loading, error };
}
