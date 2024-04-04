import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import { login } from "../reducers/UserSlice";
import { useCustomMutation } from "../utils/reactQuery";
import { signIn } from "../services/auth";
import { useCustomToast } from "../utils/toastify";

import Button from "../ui/Button";
import Input from "../ui/Input";
import ToggleEye from "../ui/ToggleEye";

import { Colors } from "../utils/enums";
import PasswordKeyOn from "./../assets/password-key-on.svg?react";
import ChevronRight from "./../assets/chevron-right.svg?react";
import User from "./../assets/user.svg?react";
import { SignInResponse } from "../utils/types2";

export const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toastError } = useCustomToast();

  const loginMutation = useCustomMutation<SignInResponse,{username:string,password:string}>(
    ({ username, password }) => signIn(username, password),
    [],
    {
      onSuccess: (data: SignInResponse) => {
        const decodedToken: Record<string, any> = jwtDecode(
          data.AccessToken
        );
        dispatch(
          login({
            token: data.AccessToken,
            userId: decodedToken.UserId,
            role: decodedToken.Role,
          })
        );
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <h1 className="mb-6 text-4xl font-semibold text-center text-dark">
        {t('titleSignInForm')}
      </h1>
      <p className="mb-12 text-lg text-center text-dark">
        Please Log in to your Account
      </p>
      <div className="w-2/3 mt-20 text-dark">
        <Input
          label="Username:"
          svgLeft={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          autoComplete="on"
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
              <ToggleEye onToggle={() => setShowPassword(!showPassword)} />
            }
            required
          />
        </div>

      </div>
      <div className="mt-3 text-xs text-right">
        <span
          className="inline-block cursor-pointer hover:text-indigo-800 hover:underline"
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

    </form >
  );
};
