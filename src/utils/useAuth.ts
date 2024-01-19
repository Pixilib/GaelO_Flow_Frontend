import { jwtDecode } from "jwt-decode";
import { lostPassword, signIn, signUp } from "../services/auth";
import { useCustomMutation } from "./reactQuery";
import { useDispatch } from "react-redux";
import { login } from "../reducers/UserSlice";
import { getUsers } from "../services/users";
import { toastError,toastSuccess } from "../utils/toastify";



export const useAuth = () => {
    const dispatch = useDispatch();

//connexion
const loginMutation = useCustomMutation(
    ({ username, password }) => signIn(username, password),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        const decodedToken: Record<string, any> = jwtDecode(
          data.data.access_token
        );
        dispatch(
          login({
            token: data.data.access_token,
            userId: decodedToken.userId,
            role: decodedToken.role,
          })
        );
        getUsers().then((response) => console.log(response.data));
      },
      onError: () => {
        toastError("Error in creadentials");
      },
    }
  );

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
    loginMutate: loginMutation.mutate,
    lostPasswordMutate: lostPasswordMutation.mutate,
    signUpMutate: signUpMutation.mutate,
  }
}