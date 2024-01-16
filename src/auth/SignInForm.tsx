import { ChangeEvent, useState } from "react";
import Button from "../RenderComponents/Button";
import Input from "../RenderComponents/Input";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import User from "./../assets/user.svg?react";
import PasswordKeyOn from "./../assets/password-key-on.svg?react";
import { Colors } from "../utils/enums";

type SignInFormProps = {
  onLogin: (username: string, password: string) => void;
};

export const SignInForm = ({ onLogin }: SignInFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-4xl font-semibold text-center mb-6 text-dark">
        Welcome back!
      </h1>
      <p className="text-lg text-dark text-center mb-12">
        Please Log in to your Account
      </p>
      <div className="w-full space-y-10 text-dark"> {/* Adjusted space-y value */}
        <Input
          label="Username:"
          svgLeft={<User />}
          bordered
          placeholder="Enter your username"
          value={username}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setUsername(event.target.value);
          }}
        />
        <Input
          label="Password:"
          svgLeft={<PasswordKeyOn />}
          bordered
          placeholder="Enter your password"
          value={password}
          type={showPassword ? "text" : "password"}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          svgRight={
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </span>
          }
        />
        <div className="flex justify-end mt-2">
          <span
            className="text-gray-600 inline-block hover:underline hover:text-indigo-800 cursor-pointer"
            onClick={() => console.log("Forgot Password?")}
          >
            Forgot Password?
          </span>
        </div>

        <div className="justify-center flex">
          <Button
            color={Colors.primary}
            onClick={() => onLogin(username, password)}
            disabled={username.length === 0 || password.length === 0}
          >
            Connect
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
