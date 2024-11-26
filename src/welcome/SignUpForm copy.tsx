import { ChangeEvent, useState } from "react";

import { signUp } from "../services/auth";
import { useCustomMutation } from "../utils/reactQuery";

import {Button, Input} from "../ui";

import { Colors } from "../utils/enums";
import { useCustomToast } from "../utils/toastify";
import { ChevronRight, Letter as Mail, User } from "./../assets";

export const SignUpForm = () => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const { toastSuccess, toastError } = useCustomToast();

  const signUpMutation = useCustomMutation<void,Record<string,string>>(
    ({ lastname, firstname, email }) =>
      signUp(lastname, firstname, email),
    [],
    {
      onSuccess: () => {
        toastSuccess("An email has been sent to you to confirm your registration.");
      },
      onError: (error: any) => {
        if (error.data.message) {
          toastError(error.data.message);
        } else {
          toastError("An error occurred during registration.");
        }
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpMutation.mutate({ lastname, firstname, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <h1 className="mb-6 text-4xl font-semibold text-center text-dark">
        Welcome to <span className="text-primary">GaelO Flow</span>
      </h1>
      <p className="mb-12 text-lg text-center">
        Please create your Account
      </p>
      <div className="flex flex-col items-center w-full max-w-md space-y-12">
        <Input
          label="Firstname :"
          svgLeft={<UserId/>}
          bordered
          placeholder="Enter your firstname"
          value={firstname}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setFirstname(event.target.value);
          }}
          autoComplete="on"
        />
        <Input
          label="Lastname :"
          svgLeft={<User />}
          bordered
          placeholder="Enter your lastname"
          value={lastname}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLastname(event.target.value);
          }}
          autoComplete="on"
        />
        <Input
          label="Email :"
          svgLeft={<Mail />}
          bordered
          placeholder="Enter your @email"
          value={email}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          autoComplete="on"
        />
        <div className="flex justify-center">
          <Button
            color={Colors.primary}
            type="submit"
            className="w-60"
          >
            Create your account
            <ChevronRight />
          </Button>
        </div>
      </div>
    </form>
  );
};