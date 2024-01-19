import { jwtDecode } from "jwt-decode";
import { signIn } from "../services/auth";
import { useCustomMutation } from "./reactQuery";
import { useDispatch } from "react-redux";
import { login } from "../reducers/UserSlice";
import { getUsers } from "../services/users";
import { toastError } from "../utils/toastify";



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

  return {
    loginMutate: loginMutation.mutate,
  }
}