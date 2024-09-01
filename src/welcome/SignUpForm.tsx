import { ChangeEvent, useState } from "react";
import { useCustomMutation } from "../utils/reactQuery";
import { signUp } from "../services/auth";
import { Button, Input } from "../ui";
import { Colors } from "../utils/enums";
import { useCustomToast } from "../utils/toastify";
import { ChevronRight, Letter as Mail, User } from "./../assets";

export const SignUpForm = () => {
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const { toastSuccess, toastError } = useCustomToast();

  const signUpMutation = useCustomMutation<void, Record<string, string>>(
    ({ lastname, firstname, email }) => signUp(lastname, firstname, email),
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
    <div className="relative flex items-center justify-center">
      <div className="absolute h-[40vh] w-[30vh] sm:h-[45vh] sm:w-[35vh] md:h-[50vh] md:w-[40vh] lg:h-[55vh] lg:w-[45vh] xl:h-[60vh] xl:w-[50vh] bg-gradient-to-r from-indigo-500 to-[#926874] shadow-2xl transform rounded-3xl rotate-6 z-0"></div>
      <div className="relative w-full px-10 bg-white shadow-lg py-14 rounded-3xl">
                  <form onSubmit={handleSubmit} className="relative z-10 flex flex-col items-center w-full">
          <h1 className="mb-4 text-2xl font-semibold text-center md:text-3xl lg:text-4xl text-dark">
            Welcome to <span className="text-primary">GaelO Flow</span>
          </h1>
          <p className="mb-6 text-sm text-center md:text-base lg:text-lg text-dark">
            Please create your Account
          </p>
          <div className="w-full max-w-sm text-dark">
            <Input
              label="Firstname:"
              svgLeft={<User />}
              bordered
              placeholder="Enter your firstname"
              value={firstname}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstname(event.target.value)}
              autoComplete="on"
              required
            />
            <Input
              label="Lastname:"
              svgLeft={<User />}
              bordered
              placeholder="Enter your lastname"
              value={lastname}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setLastname(event.target.value)}
              autoComplete="on"
              required
              className="mt-6"
            />
            <Input
              label="Email:"
              svgLeft={<Mail />}
              bordered
              placeholder="Enter your email"
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              autoComplete="on"
              required
              className="mt-6"
            />
          </div>
          <div className="flex justify-center w-full mt-8">
            <Button
              color={Colors.primary}
              type="submit"
              className="w-full"
            >
              Create your account
              <ChevronRight />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
