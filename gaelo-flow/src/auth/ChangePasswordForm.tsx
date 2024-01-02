import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "../utils/reactQuery";

import { AxiosError } from "axios";
import Input from "@/RenderComponents/Input";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Lock from "./../assets/lock.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import Button from "@/RenderComponents/Button";
import { toastError, toastSuccess } from "@/utils/toastify";
import { changePassword } from "@/services/auth";
import { svgWithOnClick } from "@/RenderComponents/svgOnClick";

export const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState("");
  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toastError("Token not found.");
      navigate("/"); // Redirection si le token n'est pas trouvé
    }
  }, [navigate]);

  const changePasswordMutation = useCustomMutation(
    ({ newPassword, token }) => changePassword(newPassword, token),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        toastSuccess(data.data.message);
        navigate("/");
      },
      onError: (error: AxiosError<{ message: string }>) => {
        //display an error message if an error occurs
        if (error.response?.data?.message) {
          toastError(error.response.data.message);
        } else {
          // display a generic error message
          toastError("An error occurred during change password.");
        }
      },
    }
  );
  const VisibilityWithClick = svgWithOnClick(() => <Visibility />);
  const VisibilityOffWithClick = svgWithOnClick(() => <VisibilityOff />);

  const onChangePassword = async () => {
    changePasswordMutation.mutate({ newPassword, token });
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-bold text-center mb-6"> Password </h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Please create/change your password.
      </p>
      <div className="w-full space-y-3">
        <Input
          label="New Password :"
          svg={<Lock />}
          rightIcon={
            showPassword ? (
              <VisibilityWithClick onClick={() => setShowPassword(false)} />
            ) : (
              <VisibilityOffWithClick onClick={() => setShowPassword(true)} />
            )
          }
          bordered
          placeholder="Enter your new password"
          value={newPassword}
          type={showPassword ? "text" : "password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewPassword(event.target.value);
          }}
        />
        <Input
          label="Confirm New Password :"
          svg={<Lock />}
          bordered
          placeholder="Confirm your new password"
          rightIcon={
            showPassword ? (
              <VisibilityWithClick onClick={() => setShowPassword(false)} />
            ) : (
              <VisibilityOffWithClick onClick={() => setShowPassword(true)} />
            )
          }
          value={confirmNewPassword}
          type={showPassword ? "text" : "password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setConfirmNewPassword(event.target.value);
          }}
        />
        <Button
          className="w-full"
          color="purple"
          onClick={() => onChangePassword()}
          disabled={newPassword !== confirmNewPassword}
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
