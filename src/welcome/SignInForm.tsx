import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import { login } from "../reducers/UserSlice";
import { useCustomMutation } from "../utils/reactQuery";
import { signIn } from "../services/auth";
import { toastError } from "../utils/toastify";

import Button from "../ui/Button";
import Input from "../ui/Input";
import ToggleEye from "../ui/ToggleEye";

import { Colors } from "../utils/enums";
import PasswordKeyOn from "./../assets/password-key-on.svg?react";
import ChevronRight from "./../assets/chevron-right.svg?react";
import User from "./../assets/user.svg?react";

export const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = useCustomMutation(
    ({ username, password }) => signIn(username, password),
    [],
    {
      onSuccess: (data: Record<string, any>) => {
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
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
      <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
        {t('titleSignInForm')}
      </h1>
      <p className="mb-12 text-center text-lg text-dark">
        Please Log in to your Account
      </p>
      <div className="mt-20 w-2/3 text-dark">
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
        
        <div className="mt-12 w-full text-dark">
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
      <div className="mt-3 text-right text-xs">
        <span
          className="inline-block cursor-pointer hover:text-indigo-800 hover:underline"
          onClick={() => navigate("/lost-password")}
        >
          Forgot Password ?
        </span>
      </div>

      <div className="mt-12 flex justify-center">
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
