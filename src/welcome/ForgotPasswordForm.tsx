import { ChangeEvent, useState } from "react";

import { useCustomMutation } from "../utils/reactQuery";
import { lostPassword } from "../services/auth";
import { toastError, toastSuccess } from "../utils/toastify";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { Colors } from "../utils/enums";
import Letter from "../assets/mail.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");

  const lostPasswordMutation = useCustomMutation(
    ({ email }) => lostPassword(email),
    [],
    {
      onSuccess: () => {
        toastSuccess("Reset password link sent by email");
      },
      onError: () => {
        toastError("Error in credentials");
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    lostPasswordMutation.mutate({ email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col">
      <h1 className="mb-12 text-center text-5xl font-bold ">Forgot Password</h1>
      <p className="mb-16 text-center text-lg">
        Enter your email address account below and we'll send you a link to
        reset your password
      </p>
      <Input
        label="Email :"
        svgLeft={<Letter />}
        bordered
        className=""
        placeholder="Enter your @email"
        value={email}
        required
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
        autoComplete="on"
      />
      <div className="mt-16 flex justify-center">
        <Button
          color={email.length === 0 ? Colors.disabled : Colors.primary}
          type="submit"
          disabled={email.length === 0}
        >
          Connect
          <ChevronRight />
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm
