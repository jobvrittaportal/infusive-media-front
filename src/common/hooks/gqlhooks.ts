import { useQuery, useMutation } from '@apollo/client/react';

export const useFetch = (query: any, variables?: any) => {
  const { data, loading, error, refetch } = useQuery(query, { variables });
  return { data, loading, error, refetch };
};

export const useCallMutation = (mutation: any) => {
  const [mutate, { data, loading, error }] = useMutation(mutation);
  return { mutate, data, loading, error };
};
