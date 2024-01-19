import Input from "../RenderComponents/Input";
import { ChangeEvent, useState } from "react";
import Letter from "../assets/mail.svg?react";
import ChevronRight from "../assets/chevron-right.svg?react";
import Button from "../RenderComponents/Button";
import { Colors } from "../utils/enums";

type LostPasswordFormProps = {
  onSubmit: (email: string) => void;
};

export const LostPasswordForm = ({ onSubmit }: LostPasswordFormProps) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex flex-col w-full">
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
      />
      <div className="justify-center flex mt-16">
        <Button
          color={Colors.primary}
          onClick={() => onSubmit(email)}
          disabled={email.length === 0}
        >
          Connect
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};
