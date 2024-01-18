import { ChangeEvent, useState } from "react";
import Button from "../RenderComponents/Button";
import Input from "../RenderComponents/Input";
import ChevronRight from "./../assets/chevron-right.svg?react";
import Visibility from "./../assets/visibility.svg?react";
import VisibilityOff from "./../assets/visibility-off.svg?react";
import User from "./../assets/user.svg?react";
import PasswordKeyOn from "./../assets/password-key-on.svg?react";
import { Colors } from "../utils/enums";
import { useNavigate } from "react-router-dom";

type SignInFormProps = {
  onLogin: (username: string, password: string) => void;
};

export const SignInForm = ({ onLogin }: SignInFormProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <h1 className="mb-6 text-4xl font-semibold text-center text-dark">
        Welcome back !
      </h1>
      <p className="mb-12 text-lg text-center text-dark">
        Please Log in to your Account
      </p>
      <div className="w-full mt-20 text-dark">
  <Input
    label="Username:"
    svgLeft={<User />}
    bordered
    placeholder="Enter your username"
    value={username}
    onChange={(event: ChangeEvent<HTMLInputElement>) => {
      setUsername(event.target.value);
    }}
    className="custom-input"
  />
  <div className="w-full mt-12 text-dark"> 
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
      className="custom-input"
    />
  </div>
  <div className="mt-3 text-xs text-right"> 
      <span
    className="inline-block text-gray-600 cursor-pointer hover:underline hover:text-indigo-800"
    onClick={() => navigate("/lost-password")}
  >
    Forgot Password ?
  </span>
</div>

        <div className="flex justify-center mt-12">
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
