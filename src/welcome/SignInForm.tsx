import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { jwtDecode } from "jwt-decode";

import { login, setCanExitPage } from "../reducers/UserSlice";
import { useCustomMutation } from "../utils/reactQuery";
import { signIn } from "../services/auth";
import { useCustomToast } from "../utils/toastify";
import { Colors } from "../utils/enums";
import { SignInResponse } from "../utils/types";
import PasswordLock from "../icons/PasswordLock";

import { Button, Input, ToggleEye } from "../ui";
import { ChevronRight, User } from "./../assets";
import UserId from "../icons/UserId";

export const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toastError } = useCustomToast();

  const loginMutation = useCustomMutation<
    SignInResponse,
    { email: string; password: string }
  >(({ email, password }) => signIn(email, password), [], {
    onSuccess: (data: SignInResponse) => {
      const decodedToken: Record<string, any> = jwtDecode(data.accessToken);
      dispatch(
        login({
          token: data.accessToken,
          userId: data.userId,
          role: {
            name: decodedToken.role?.Name ?? null,
            import: decodedToken.role?.Import ?? null,
            anonymize: decodedToken.role?.Anonymize ?? null,
            export: decodedToken.role?.Export ?? null,
            query: decodedToken.role?.Query ?? null,
            autoQuery: decodedToken.role?.AutoQuery ?? null,
            delete: decodedToken.role?.Delete ?? null,
            admin: decodedToken.role?.Admin ?? null,
            modify: decodedToken.role?.Modify ?? null,
            cdBurner: decodedToken.role?.CdBurner ?? null,
            autoRouting: decodedToken.role?.AutoRouting ?? null,
            readAll: decodedToken.role?.ReadAll ?? null,
          }
        })
      );
    },
    onError: () => {
      toastError("Error in credentials");
    },
  });

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="relative flex items-center justify-center w-full ">
      {/* Background square */}
      <div className="absolute h-full w-full bg-gradient-to-r from-indigo-500 to-[#926874] dark:from-blue-950 dark:to-rose-950 shadow-2xl transform rounded-3xl rotate-6 z-0"></div>

      <div className="relative px-10 bg-white shadow-lg dark:text-white dark:opacity-70 dark:bg-neutral-700 py-14 rounded-3xl">
        <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center w-full">
          <h1 className="mb-4 text-4xl font-semibold text-center text-dark dark:text-white">
            {t("titleSignInForm")}
          </h1>
          <p className="mb-10 text-lg text-center text-dark dark:text-white">
            Please Log in to your Account
          </p>
          <div className="w-2/3 mt-10 text-dark">
            <Input
              label="Email:"
              svgLeft={<UserId />}
              bordered
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setEmail(event.target.value);
              }}
              autoComplete="on"
              required
            />

            <div className="w-full mt-12 text-dark">
              <Input
                label="Password:"
                svgLeft={<PasswordLock />}
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
              className="inline-block cursor-pointer hover:text-indigo-800 hover:underline dark:text-white dark:hover:text-indigo-300"

              onClick={() => navigate("/lost-password")}
            >
              Forgot Password?
            </span>
          </div>

          <div className="flex justify-center w-full mt-12">
            <Button
              color={Colors.primary}
              type="submit"
              disabled={email.length === 0 || password.length === 0}
              className="w-full"
            >
              Connect
              <ChevronRight />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
