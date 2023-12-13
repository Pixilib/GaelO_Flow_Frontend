// useSignIn.ts
import { useDispatch } from 'react-redux';
import { signIn } from './authService'; // Importe la fonction signIn de authService
import { login } from '../reducers/UserSlice'; // Remplace par le chemin correct de ton UserSlice
import {jwtDecode} from 'jwt-decode';
import { useCustomMutation } from '../utils/reactQuery';
import { UseMutationResult } from '@tanstack/react-query';


type SignInCredentials = {
  username: string;
  password: string;
}

type SignInResponse= {
  token: string;
}

type DecodedToken = {
    userId: string;
}

export const useSignIn = (): UseMutationResult<SignInResponse, Error, SignInCredentials> => {
  const dispatch = useDispatch();

  return useCustomMutation<SignInResponse, Error, SignInCredentials>(
    (credentials: SignInCredentials) => signIn(credentials),
    'Success connected', // Message de succès personnalisé
    [], // Clés de requête à invalider après la mutation
    {
      onSuccess: (data) => {
        const decodedToken = jwtDecode<DecodedToken>(data.token);
        dispatch(login({ token: data.token, userId: decodedToken.userId }));
      },
      onError: (error) => {
        console.log(error);
        // Gérer les erreurs ici
      },
      onSettled: () => {
        // Gérer les actions à effectuer après la mutation ici
      }
      // Ajoutez d'autres gestionnaires si nécessaire
    }
  );
};
