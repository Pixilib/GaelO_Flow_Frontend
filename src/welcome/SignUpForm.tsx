import { ChangeEvent, useState } from "react";

import { signUp } from "../services/auth";
import { useCustomMutation } from "../utils/reactQuery";
import { toastError, toastSuccess } from "../utils/toastify";

import Button from "../RenderComponents/Button";
import Input from "../RenderComponents/Input";
import { Colors } from "../utils/enums";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Mail from "./../assets/mail.svg?react";
import User from "./../assets/user.svg?react";

export const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");

  const signUpMutation = useCustomMutation(
    ({ username, lastname, firstname, email }) =>
      signUp(username, lastname, firstname, email),
    null,
    [],
    {
      onSuccess: (data: Record<string, any>) => {
        toastSuccess(data.data.message);
      },
      onError: (error: any) => {
        //display an error message if an error occurs
        if (error.response?.data?.message) {
          toastError(error.response.data.message);
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
    <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
  <h1 className="mb-6 text-center text-4xl font-semibold text-dark">
    Welcome to <span className="text-primary">Gaelo Flow</span>
  </h1>
  <p className="mb-12 text-center text-lg">
    Please create your Account
  </p>
  <div className="flex w-full max-w-md flex-col items-center space-y-12"> 
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
