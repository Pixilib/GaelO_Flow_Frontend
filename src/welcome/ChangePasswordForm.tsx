import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCustomMutation } from "../utils/reactQuery";
import { toastError, toastSuccess } from "../utils/toastify";
import { changePassword } from "../services/auth";

import Button from "../ui/Button";
import { Colors } from "../utils/enums";

import ChevronRight from "./../assets/chevron-right.svg?react";
import Key from "./../assets/password-key-on.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import Input from "../ui/Input";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const token = new URLSearchParams(window.location.search).get("token");

  const changePasswordMutation = useCustomMutation(
    ({ newPassword, confirmPassword, token }) =>
      changePassword(newPassword, confirmPassword, token),
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        toastSuccess(data.message);
        navigate("/");
      },
      onError: (error: any) => {
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

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    changePasswordMutation.mutate({ newPassword, token });
  };

  if (!token) return <>Missing Token</>;

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <h1 className="mb-6 text-center text-5xl font-bold"> Password </h1>
      <p className="text-gray-700 mb-12 text-center text-lg">
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
        <div className="mt-12 flex justify-center">
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
