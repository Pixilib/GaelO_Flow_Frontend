import { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook for making a query using React Query.
 *
 * @template T - The type of the data returned by the query.
 * @template R - The type of the data returned by the query's result.
 * @param {string[]} queryKeys - The keys used to identify the query.
 * @param {() => Promise<T>} queryFn - The function that performs the query.
 * @param {Omit<UseQueryOptions<T, unknown, R, QueryKey>, 'queryKey' | 'queryFn'>} [options] - Additional options for the query.
 * @returns {QueryObserverResult<T, unknown, R>} - The result of the query.
 * @example: 
 * const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<OrthancJob[]>
 *    (["jobs"], () => getJobs(), {
 *     enabled: true,
 *    refetchInterval: 10000,
 *   });
 */
const useCustomQuery = <T, R = T>(
    queryKeys: string[],
    queryFn: () => Promise<T>,
    options?: Omit<UseQueryOptions<T, unknown, R, QueryKey>, 'queryKey' | 'queryFn'> & {
        onSuccess?: (data: R) => void;
        onError?: (error: unknown) => void;
    }
) => {
    return useQuery<T, unknown, R>({
        queryKey: queryKeys,
        queryFn,
        gcTime: 0,
        retry: false,
        ...options,
    });
};

/**
 * Custom hook for performing a mutation with React Query.
 * @template T - The type of the mutation result.
 * @template V - The type of the mutation variables.
 * @param {Function} mutationFn - The function that performs the mutation.
 * @param {string[][]} invalidatedQueryKeys - The query keys to invalidate after the mutation is successful.
 * @param {UseMutationOptions<T, unknown, V>} [options] - Additional options for the mutation.
 * @returns {UseMutationResult<T, unknown, V>} - The result of the mutation.
 */
const useCustomMutation = <T, V = undefined|any> (
    mutationFn: (variables: V) => Promise<T>,
    invalidatedQueryKeys: string[][] = [],
    options?: Omit<UseMutationOptions<T, unknown, V>, 'mutationFn'>
): UseMutationResult<T, unknown, V> => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn,
        retry: false,
        ...options,
        onSuccess: (data, variables, context) => {
            // Fonction pour invalider toutes les requêtes
            const invalidateAllQueries = (keys: string[][]) => {
                keys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
            };
            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
            invalidateAllQueries(invalidatedQueryKeys);
        },
        
    });
};

export { useCustomQuery, useCustomMutation }