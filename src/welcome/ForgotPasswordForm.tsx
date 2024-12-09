import { ChangeEvent, useState } from "react";

import { useCustomMutation } from "../utils/reactQuery";
import { lostPassword } from "../services/auth";
import { Colors } from "../utils/enums";
import { useCustomToast } from "../utils/toastify";

import { Button, Input } from "../ui";
import { Letter, ChevronRight } from "../assets";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const { toastSuccess, toastError } = useCustomToast();

  const lostPasswordMutation = useCustomMutation<void,{email:string}>(
    ({ email }) => lostPassword(email),
    [],
    {
      onSuccess: () => {
        toastSuccess("Reset password link sent by email");
      },
      onError: (error:any) => {
        if(error.data.message){
          toastError(error.data.message);
        }
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
      <h1 className="mb-12 text-5xl font-bold text-center ">Forgot Password</h1>
      <p className="mb-16 text-lg text-center">
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
      <div className="flex justify-center mt-16">
        <Button
          color={Colors.primary}
          disabled={email.length === 0}
          type="submit"
        >
          Connect
          <ChevronRight />
        </Button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm
