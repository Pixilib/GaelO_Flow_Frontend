import { ChangeEvent, useState } from "react";

import { signUp } from "../services/auth";
import { useCustomMutation } from "../utils/reactQuery";

import Button from "../ui/Button";
import Input from "../ui/Input";
import { Colors } from "../utils/enums";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Mail from "./../assets/mail.svg?react";
import User from "./../assets/user.svg?react";
import { useCustomToast } from "../utils/toastify";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const { toastSuccess, toastError } = useCustomToast();

  const signUpMutation = useCustomMutation(
    ({ username, lastname, firstname, email }) =>
      signUp(username, lastname, firstname, email),
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        toastSuccess(data.message);
      },
      onError: (error: any) => {
        //display an error message if an error occurs
        if (error.response?.message) {
          toastError(error.response.message);
        } else {
          // display a generic error message
          toastError("An error occurred during registration.");
        }
      },
    }
  );

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUpMutation.mutate({ username, lastname, firstname, email });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
      <h1 className="mb-6 text-4xl font-semibold text-center text-dark">
        Welcome to <span className="text-primary">Gaelo Flow</span>
      </h1>
      <p className="mb-12 text-lg text-center">
        Please create your Account
      </p>
      <div className="flex flex-col items-center w-full max-w-md space-y-12">
        <Input
          label="Username :"
          className="w-full"
          svgLeft={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          required
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
          autoComplete="on"
        />
        <Input
          label="Firstname :"
          svgLeft={<User />}
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
