import { ChangeEvent, useState } from "react";

import Button from "../RenderComponents/Button";
import Input from "../RenderComponents/Input";
import ChevronRight from "./../assets/chevron-right.svg?react";
import User from "./../assets/user.svg?react";
import Lock from "./../assets/lock.svg?react";

type SignInFormProps = {
  onLogin: (username: string, password: string) => void;
}

export const SignInForm = ({ onLogin }: SignInFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-5xl font-bold text-center mb-6">Welcome !</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Please Log in to your Account.
      </p>
      <div className="w-full space-y-3">
        <Input
          label="Username :"
          className="w-full"
          svg={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          label="Password :"
          svg={<Lock />}
          bordered
          placeholder="Enter your password"
          value={password}
          type="password"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <div className="justify-center flex">
          <Button
            color="purple"
            onClick={() => onLogin(username, password)}
            bordered
            disabled={username.length == 0 || password.length == 0}
          >
            Connect
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>

  );
};
