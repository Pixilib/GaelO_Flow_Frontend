import { ChangeEvent, useState } from "react";

import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";
import { IoIosCloseCircle as CloseWindows } from "react-icons/io";
import { getRoles, postUsers } from "../../../services/users";
import {
  Colors,
  useCustomMutation,
  useCustomQuery,
  UserPayload,
  useCustomToast,
} from "../../../utils";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Label,
  SelectInput,
  ToggleEye,
} from "../../../ui";
import { Option, Role } from "../../../utils/types";

type UserFormProps = {
  title: string;
  className?: string;
  onClose: () => void;
};

const CreateUserForm = ({ title, className, onClose }: UserFormProps) => {
  const { toastSuccess, toastError } = useCustomToast();

  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState<{ value: string, label: string } | null>(null);


  const { data: rolesOptions } = useCustomQuery<Role[], Option[]>(
    ["roles"],
    getRoles,
    {
      select: (roles) => roles.map((role) => ({
        value: role.Name,
        label: role.Name,
      })),
    }
  );

  const userMutation = useCustomMutation<number, UserPayload>(
    (user) => postUsers(user),
    [["users"]],
    {
      onSuccess: () => {
        setFirstName("");
        setLastName("");
        setPassword("");
        setEmail("");
        setSelectedRole(null);
        toastSuccess("User created with success");
      },
      onError: (error: any) => {
        toastError(
          "An error occurred during user creation." + (error.data.message ?? "")
        );
      },
    }
  );


  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedRole) {
      toastError("Please select a role");
      return;
    }
    const payload: UserPayload = {
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      RoleName: selectedRole.value,
      Password: password,
    };
    userMutation.mutate(payload);
  };
  return (
    <Card className={`my-10 h-full ${className}`}>
      <CardHeader title={title} color={Colors.success}>
        <CloseWindows
          size={"1.7rem"}
          onClick={() => onClose()}
          className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
        />
      </CardHeader>

      <CardBody color={Colors.lightGray}>
        <form onSubmit={handleSubmit} className="grid gap-y-2 lg:gap-y-4">
          <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-3 lg:gap-11">
            <Input
              label={
                <Label
                  value="Firstname *"
                  className="text-sm font-medium text-center"
                  align="left"
                />
              }
              placeholder="Enter your firstname"
              className="mt-1 lg:mt-3"
              value={firstName}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFirstName(event.target.value)
              }
            />
            <Input
              label={
                <Label
                  value="Lastname *"
                  className="text-sm font-medium text-center"
                  align="left"
                />
              }
              placeholder="Enter your lastname"
              className="mt-1 lg:mt-3"
              value={lastName}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setLastName(event.target.value)
              }
            />
            <Input
              label={
                <Label
                  value="Password *"
                  className="text-sm font-medium text-center"
                  align="left"
                />
              }
              type={show ? "text" : "password"}
              placeholder="Enter your password"
              className="mt-1 lg:mt-3 rounded-xl"
              svgRight={<ToggleEye onToggle={(visible) => setShow(visible)} />}
              value={password}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
          </div>
          <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
            <Input
              label={
                <Label
                  value="Email *"
                  className="text-sm font-medium text-center"
                  align="left"
                />
              }
              type="email"
              placeholder="example@example.com"
              className="mt-1 lg:mt-3 rounded-xl"
              value={email}
              required
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
            />
            <label className="flex flex-col">
              <span className="mt-1 mb-2 text-sm font-bold lg:mt-3">
                {" "}
                Rôles *
              </span>
              <SelectInput
                options={rolesOptions ?? []}
                placeholder="Select a Rôle"
                onChange={(event) => {
                  setSelectedRole({ value: event.value, label: event.value });
              }}
                value={selectedRole}
              />
            </label>
          </div>

          <div className="grid grid-cols-1 col-span-3 mt-3 ">
            <Button
              color={Colors.success}
              className="h-12 gap-3 justify-self-center w-36 md:justify-center"
              type="submit"
            >
              <SubmitUser size={"1.3rem"} />
              <div className="">Submit</div>
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
};
export default CreateUserForm;
