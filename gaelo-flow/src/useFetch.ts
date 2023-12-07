import { useQuery, UseQueryResult } from 'react-query';

export const useGet = <T,>(url: string): UseQueryResult<T, Error> => {
  const fetcher = async (): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };

  return useQuery<T, Error>(['customFetch', url], fetcher);
};

export const usePost = <T,>(url: string, body: T): UseQueryResult<T, Error> => {
  const fetcher = async (): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json() as Promise<T>;
  };

  return useQuery<T, Error>(['customFetch', url], fetcher);
}