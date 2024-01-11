import Input from "../RenderComponents/Input";
import { ChangeEvent, useState } from "react";
import Letter from "../assets/letter.svg?react";

export const LostPasswordForm = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col w-full justify-between">
      <h1 className="text-5xl font-bold text-center mb-6">Forgot Password</h1>
      <p className="text-lg text-gray-700 text-center mb-12">
        Enter the email you used to create your account so we can send you
        instructions on how to reset your password.
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
        />
    </div>
  );
};
