import { ChangeEvent, useState } from "react";

import { useCustomMutation } from "../utils/reactQuery";
import { signUp } from "../services/auth";

import Button from "../RenderComponents/Button";
import ChevronRight from "./../assets/chevron-right.svg?react";
import User from "./../assets/user.svg?react";
import Mail from "./../assets/mail.svg?react";
import { toastSuccess, toastError } from "../utils/toastify";
import Input from "../RenderComponents/Input";


export const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [email, setEmail] = useState("");


    const signUpMutation = useCustomMutation(
        () => signUp({username, lastname, firstname, email}),
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

    const onRegister = async () => {
            signUpMutation.mutate({username, lastname, firstname, email});
    }

    return (
        <div className="flex flex-col w-full ">
          <h1 className="text-5xl font-bold text-center mb-6">Register </h1>
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
            />
            <Input
              label="Firstname :"
              svgLeft={<User />}
              bordered
              placeholder="Enter your firstanme"
              value={firstname}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setFirstname(event.target.value);
              }}
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
            />
            <Button
              className="w-full"
              color="primary"
              onClick={() => onRegister()}
              bordered
            >
              <div className="w-1/2 flex justify-around">
                Connect
                <ChevronRight />
              </div>
            </Button>
          </div>
        </div>
      )
}