import { ChangeEvent, useState } from "react";

import { useCustomMutation } from "../utils/reactQuery";
import { lostPassword } from "../services/auth";
import { toastError, toastSuccess } from "../utils/toastify";

import Input from "../RenderComponents/Input";
import Button from "../RenderComponents/Button";
import { Colors } from "../utils/enums";
import Letter from "../assets/mail.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";

export const LostPasswordForm = () => {
  const [email, setEmail] = useState("");

  const lostPasswordMutation = useCustomMutation(
    ({ email }) => lostPassword(email),
    null,
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
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-5xl font-bold text-center mb-12 ">Forgot Password</h1>
      <p
        className="text-lg text-gray-700 text-center mb-16 
      "
      >
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
      <div className="justify-center flex mt-16">
        <Button
          color={Colors.primary}
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