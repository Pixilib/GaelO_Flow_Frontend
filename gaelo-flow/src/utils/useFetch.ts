import { useQuery, UseQueryResult} from 'react-query';
import { useMutation, UseMutationResult } from 'react-query';


export const useGenericQuery = <T,>(queryKey: string, url: string): UseQueryResult<T, Error> => {
  const fetcher = async (): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };

  return useQuery<T, Error>(queryKey, fetcher);
};


/**
 * @param queryKey  The query key is a unique key for the query.
 * @param url  The url is the url to fetch the data from.
 * @param method  The method is the HTTP method to use for the request.
 * @returns  The useMutation hook returns an object with the following properties:
 * mutate: A function to trigger the mutation manually.
 * mutateAsync: An async function to trigger the mutation manually.
 * reset: A function to reset the state of the mutation.
 * state: The current state of the mutation.
 * error: The error of the mutation, if any.
 */
export const useGenericMutation = <T, U>(queryKey: string, url: string, method: string = 'POST'): UseMutationResult<T, Error, U> => {
  console.log('useGenericMutation', 'queryKey', queryKey, 'url', url, 'method', method);
  qcTime: 0;
  const mutator = async (body: U): Promise<T> => {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };

  return useMutation<T, Error, U>(queryKey, mutator);
};