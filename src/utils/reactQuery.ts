import { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useCustomQuery = <T, R = T>(
    queryKeys: string[],
    queryFn: () => Promise<T>,
    options?: Omit<UseQueryOptions<T,unknown, R, QueryKey>, 'queryKey' | 'queryFn'>
) => {
    return useQuery<T, unknown, R>({
        queryKey: queryKeys,
        queryFn,
        gcTime: 0,
        retry: false,
        ...options,
    });
};

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