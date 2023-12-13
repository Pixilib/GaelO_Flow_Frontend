import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toastError, toastSuccess } from './toastify'

const useCustomQuery = (
  queryKeys: string[],
  queryFn: () => Promise<unknown>,
  options?: { [key :string] : any}
) => {
  return useQuery({
    queryKey: queryKeys,
    queryFn: queryFn,
    gcTime: 0, 
    retry: false,
    ...options
  });
};

const useCustomMutation = (
  mutationFn :(...args : any[])=> Promise<unknown>,
  successMessage: string|null,
  invalidatedQueryKeys: string[][] = [],
  options?: { [key :string] : any}
) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mutationFn,
        retry: false,
        onSuccess: (data, variables, context) => {
            // Fonction pour invalider toutes les requêtes
            const invalidateAllQueries = (keys: string[][]) => {
                keys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
            };

            // Personnaliser le message de succès
            if (successMessage) toastSuccess(successMessage);

            if (options?.onSuccess) {
                options.onSuccess(data, variables, context);
            }
            invalidateAllQueries(invalidatedQueryKeys);
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