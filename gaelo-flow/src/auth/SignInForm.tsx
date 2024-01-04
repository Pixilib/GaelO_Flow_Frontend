import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

import { jwtDecode } from "jwt-decode";

import { useCustomMutation } from "../utils/reactQuery";
import { signIn } from "../services/auth";
import { login } from "../reducers/UserSlice";
import { toastError } from "../utils/toastify";

import Button from "../RenderComponents/Button";
import Input2 from "@/RenderComponents/Input2";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import User from "./../assets/user.svg?react";
import Lock from "./../assets/lock.svg?react";
import { svgWithOnClick } from "@/RenderComponents/svgOnClick";

export const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


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
      },
      onError: () => {
        toastError("Error in creadentials");
      },
    }
  );

  const VisibilityWithClick = svgWithOnClick(() => <Visibility />);
  const VisibilityOffWithClick = svgWithOnClick(() => <VisibilityOff />);


  const onLogin = async () => {
    loginMutation.mutate({ username, password });
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-bold text-center mb-6">Welcome !</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Please Log in to your Account.
      </p>
      <div className="w-full space-y-3">
        <Input2
          label="Username :"
          className="w-full"
          svgLeft={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
        />
        <Input2
          label="Password :"
          svgLeft={<Lock />}
          bordered
          placeholder="Enter your password"
          value={password}
          type="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          rightIcon={
            showPassword ? (
              <VisibilityWithClick onClick={() => setShowPassword(false)} />
            ) : (
              <VisibilityOffWithClick onClick={() => setShowPassword(true)} />
            )
          }
        />
        <Button
          className="w-full"
          color="purple"
          onClick={() => onLogin()}
          bordered
          disabled={username.length == 0 || password.length == 0}
        >
          <div className="w-1/2 flex justify-around">
            Connect
            <ChevronRight />
          </div>
        </Button>
      </div>
    </div>
  );
};
