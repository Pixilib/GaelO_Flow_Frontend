import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useCustomMutation } from "../utils/reactQuery";
import { toastError, toastSuccess } from "../utils/toastify";
import { changePassword } from "../services/auth";

import Button from "../RenderComponents/Button";
import { Colors } from "../utils/enums";

import ChevronRight from "./../assets/chevron-right.svg?react";
import Key from "./../assets/password-key-on.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import Input from "../RenderComponents/Input";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
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
    ({ newPassword,confirmPassword, token }) => changePassword(newPassword,confirmPassword, token),
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
          console.table(error);
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-5xl font-bold text-center mb-6"> Password </h1>
      <p className="text-lg text-gray-700 text-center mb-12">
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
