import { ChangeEvent, useState } from "react";

import Button from "../RenderComponents/Button";
import ChevronRight from "./../assets/chevron-right.svg?react";
import User from "./../assets/user.svg?react";
import Mail from "./../assets/mail.svg?react";
import Input from "../RenderComponents/Input";
import { Colors } from "../utils/enums";

export type SignUpFormProps = {
  onRegister: (username: string, lastname: string, firstname: string, email: string ) => void;
};

export const SignUpForm = ({ onRegister }: SignUpFormProps) => {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");

 
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onRegister(username, lastname, firstname, email);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      <h1 className="text-4xl font-semibold text-center mb-6 text-dark">
        Welcome to <span className="text-primary">Gaelo Flow</span>
      </h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Please create your Account.
      </p>
      <div className="w-full space-y-12">
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
          autocomplete="username"
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
          autocomplete="firstname"
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
          autocomplete="lastname"
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
          autocomplete="email"
        />
        <div className="justify-center flex">
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
