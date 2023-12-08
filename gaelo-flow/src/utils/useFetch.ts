import { MutationFunction, QueryFunction, QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toastError, toastSuccess } from './toastify'

/**
 * Custom hook for request data with react-query.
 * @param queryKeys - Clé(s) de requête.
 * @param queryFn - Fonction qui retourne les données de la requête.
 * @param options - Options supplémentaires pour la requête.
 * @returns Résultat de useQuery.
 */
const useCustomQuery = <TData, TError>(
  queryKeys: QueryKey,
  queryFn: QueryFunction<TData, QueryKey>,
  options?: Omit<UseQueryOptions<TData, TError, TData, QueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> => {
  return useQuery<TData, TError, TData, QueryKey>({
    queryKey: queryKeys,
    queryFn: queryFn,
    //qcTime: 0, 
    retry: false,
    ...options
  });
};

// Type étendu pour les options de useMutation
interface CustomMutationOptions<TData, TError, TVariables, TContext> extends Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'> {
  delayInvalidation?: boolean;
}

/**
 * Custom hook for performing mutations with react-query.
 *
 * @param mutationFn - La fonction de mutation.
 * @param successMessage - Message de succès personnalisé.
 * @param invalidatedQueryKeys - Clés de requête à invalider après la mutation.
 * @param options - Options supplémentaires pour la mutation.
 * @returns Résultat de useMutation.
 */
const useCustomMutation = <TData, TError, TVariables, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  successMessage: string,
  invalidatedQueryKeys: QueryKey[] = [],
  options?: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
    const queryClient = useQueryClient();

    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn: mutationFn,
        // qcTime: 0, //
        retry: false,
        onSuccess: (data, variables, context) => {
            // Fonction pour invalider toutes les requêtes
            const invalidateAllQueries = (keys: QueryKey[]) => {
                keys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
            };

            // Personnaliser le message de succès
            if (successMessage) toastSuccess(successMessage);

            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
                if (options.delayInvalidation) {
                    setTimeout(() => invalidateAllQueries(invalidatedQueryKeys), 50);
                } else {
                    invalidateAllQueries(invalidatedQueryKeys);
                }
            } else {
                invalidateAllQueries(invalidatedQueryKeys);
            }
        },
        onError: (error, variables, context) => {
            if (options?.onError) {
                options.onError(error, variables, context);
            } else {
                toastError(error instanceof Error ? error.message : 'Error');
            }
        },
        onSettled: (data, error, variables, context) => {
            if (options?.onSettled) {
                options.onSettled(data, error, variables, context);
            }
        },
        ...options
    });
};

export { useCustomQuery, useCustomMutation }