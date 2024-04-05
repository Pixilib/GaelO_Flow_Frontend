import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "../utils/reactQuery";
import { changePassword } from "../services/auth";

import Button from "../ui/Button";
import { Colors } from "../utils/enums";

import ChevronRight from "./../assets/chevron-right.svg?react";
import Key from "./../assets/password-key-on.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import Input from "../ui/Input";
import { useCustomToast } from "../utils/toastify";
import { ChangePasswordVariables } from '../utils/types';
import { getQueryParams } from "../utils/queryParams";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { toastSuccess, toastError } = useCustomToast();


  const { token, userId } = getQueryParams();
  console.log({token, userId})
  const changePasswordMutation = useCustomMutation<any, ChangePasswordVariables>(
    () => changePassword(newPassword, confirmPassword, token, Number(userId)),
    [],
    {
      onSuccess: (responseData) => {
        const successMessage = responseData || "Password changed successfully.";
        toastSuccess(successMessage);
        navigate("/");
      },
      onError: (error: any) => {
        console.log({error})
          if (error?.data?.message?.[0]?.constraints) {
            const constraints = error.data.message[0].constraints;
            const errorMessage = Object.values(constraints).join(' ');
            toastError(errorMessage);
          } else {
            toastError("An error occurred during password change.");
          }
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword === confirmPassword && token && userId) {
      console.log({newPassword, confirmPassword, token, userId})
      changePasswordMutation.mutate({ NewPassword: newPassword, ConfirmationPassword: confirmPassword, Token: token, UserId: Number(userId)});
    } else {
      toastError("Passwords do not match, token is missing or User not found.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="mb-6 text-5xl font-bold text-center"> Password </h1>
      <p className="mb-12 text-lg text-center text-gray-700">
        Please create/change your password.
      </p>
      <div className="w-full space-y-12">
        <Input
          label="New Password :"
          svgLeft={<Key />}
          svgRight={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          }
          bordered
          placeholder="Enter your new password"
          value={newPassword}
          type={showPassword ? "text" : "password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewPassword(event.target.value);
          }}
          required
        />
        <Input
          label="Confirm New Password :"
          svgLeft={<Key />}
          bordered
          placeholder="Confirm your new password"
          svgRight={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          }
          value={confirmPassword}
          type={showPassword ? "text" : "password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setconfirmPassword(event.target.value);
          }}
          required
        />
        <div className="flex justify-center mt-12">
          <Button
            color={Colors.primary}
            type="submit"
            disabled={newPassword !== confirmPassword}
          >
            Connect
            <ChevronRight />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
