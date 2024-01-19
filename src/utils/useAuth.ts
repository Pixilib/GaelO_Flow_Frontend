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
  const signUpMutation = useCustomMutation(
    ({username,lastname,firstname,email}) => signUp(username, lastname, firstname, email),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        toastSuccess(data.data.message);
      },
      onError: (error: any) => {
        //display an error message if an error occurs
        if (error.response?.data?.message) {
          toastError(error.response.data.message);
        } else {
          // display a generic error message
          toastError("An error occurred during registration.");
        }
      },
    }
  );


  return {
    lostPasswordMutate: lostPasswordMutation.mutate,
    signUpMutate: signUpMutation.mutate,
  }
}