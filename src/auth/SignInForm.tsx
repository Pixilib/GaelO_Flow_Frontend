import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { login } from "../reducers/UserSlice";
import { useCustomMutation } from "../utils/reactQuery";
import { signIn } from "../services/auth";
import { getUsers } from "../services/users";
import { toastError } from "../utils/toastify";

import Button from "../RenderComponents/Button";
import Input from "../RenderComponents/Input";

import { Colors } from "../utils/enums";
import PasswordKeyOn from "./../assets/password-key-on.svg?react";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import User from "./../assets/user.svg?react";

export const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


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


  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-4xl font-semibold text-center mb-6 text-dark">
        Welcome back !
      </h1>
      <p className="mb-12 text-lg text-center text-dark">
        Please Log in to your Account
      </p>
      <div className="w-full mt-20 text-dark">
        <Input
          label="Username:"
          svgLeft={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          autocomplete="username"
          required
        />
        <div className="w-full mt-12 text-dark">
          <Input
            label="Password:"
            svgLeft={<PasswordKeyOn />}
            bordered
            placeholder="Enter your password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
            svgRight={
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </span>
            }
            required
          />
        </div>
        <div className="mt-3 text-xs text-right">
          <span
            className="inline-block text-gray-600 cursor-pointer hover:underline hover:text-indigo-800"
            onClick={() => navigate("/lost-password")}
          >
            Forgot Password ?
          </span>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            color={Colors.primary}
            type="submit"
            disabled={username.length === 0 || password.length === 0}
          >
            Connect
            <ChevronRight />
          </Button>
        </div>
      </div>
    </form>
  );
};
