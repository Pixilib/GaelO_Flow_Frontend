import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

import { changePassword } from "../services/auth";
import { useCustomMutation } from "../utils/reactQuery";

import { getQueryParams } from "../utils/queryParams";
import { useCustomToast } from "../utils/toastify";
import { Colors } from "../utils/enums";

import { Button } from "../ui";
import { ChevronRight } from "./../assets";
import InputPassword from "../ui/InputPassword";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toastSuccess, toastError } = useCustomToast();

  const { token, userId } = getQueryParams();
  const changePasswordMutation = useCustomMutation<void>(
    () => changePassword(newPassword, confirmPassword, token, Number(userId)),
    [],
    {
      onSuccess: () => {
        const successMessage = "Password changed successfully.";
        toastSuccess(successMessage);
        navigate("/");
      },
      onError: (error: any) => {
        if (error?.data?.message?.[0]?.constraints) {
          const constraints = error.data.message[0].constraints;
          const errorMessage = Object.values(constraints).join(" ");
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
      changePasswordMutation.mutate({
        NewPassword: newPassword,
        ConfirmationPassword: confirmPassword,
        Token: token,
        UserId: Number(userId),
      });
    } else {
      toastError("Passwords do not match, token is missing or User not found.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="mb-6 text-5xl font-bold text-center">Change Password</h1>
      <p className="mb-12 text-lg text-center text-gray-700">
        Please create/change your password.
      </p>
      <div className="w-full space-y-12">
        <InputPassword
          label="New Password :"
          placeholder="Enter your new password"
          value={newPassword}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setNewPassword(event.target.value);
          }}
          required
        />
        <InputPassword
          label="Confirm New Password :"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(event.target.value);
          }}
          required
        />
        <div className="flex justify-center mt-12">
          <Button
            color={Colors.primary}
            type="submit"
            disabled={newPassword !== confirmPassword}
          >
            Change Password
            <ChevronRight />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
