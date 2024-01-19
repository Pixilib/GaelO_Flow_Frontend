import { lostPassword, signUp } from "../services/auth";
import { useCustomMutation } from "./reactQuery";
import { toastError,toastSuccess } from "../utils/toastify";



export const useAuth = () => {

//connexion


 //forgot Passwod
  const lostPasswordMutation = useCustomMutation(
    ({ email }) => lostPassword(email),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        console.log(data);
      },
      onError: () => {
        toastError("Error in creadentials");
      },
    }
  );

  // register



  return {
    lostPasswordMutate: lostPasswordMutation.mutate,
  }
}