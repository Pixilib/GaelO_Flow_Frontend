import { ChangeEvent, useState } from "react";

import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";
import { IoIosCloseCircle as CloseWindows } from "react-icons/io";
import { getRoles, postUsers } from "../../services/users";
import { Colors, useCustomMutation, useCustomQuery, RolesUserResponse, UserPayload, useCustomToast } from '../../utils';

import { Button, Card, CardBody, CardHeader, Input, Label, SelectionInput, ToggleEye } from "../../ui";


type UserFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
}
//!WIP 
const CreateUserForm = ({ title, className, onClose}: UserFormProps) => {
    const [show, setShow] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    
    const { data: roles } = useCustomQuery<RolesUserResponse>(
        ["roles"], () => getRoles(),
        {
            enabled: true,
        }
    );
    const rolesOptions = roles ? roles.map((role) => {
        return {
            value: role.Name,
            label: role.Name
        }
    }) : [];
    const { toastSuccess, toastError } = useCustomToast()

    const userMutation = useCustomMutation<number, UserPayload>(
        ({ Firstname, Password, Lastname, Email, RoleName }) =>
            postUsers({ Firstname, Password, Lastname, Email, RoleName }),
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
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user creation.");
                }
            },
        }
    )

    const handleRoleChange = (value:any) => {
        setSelectedRole(value.value);
    };

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
            RoleName: selectedRole,
            Password: password,
        };
            userMutation.mutate(payload);
        }
        
    return (
        <Card className={`my-10 h-full ${className}`}>
            <CardHeader title={title} color={Colors.success} >
                <CloseWindows size={"1.7rem"}
                    onClick={() => onClose()}
                    className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
                />
            </CardHeader>

            <CardBody color={Colors.lightGray}>
                <form onSubmit={handleSubmit} className="grid gap-y-2 lg:gap-y-4">
                    <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
                        <Input
                            label={
                                <Label value="Firstname *"
                                    className="text-sm font-medium text-center"
                                    align="left"
                                />
                            }
                            placeholder="Enter your firstname"
                            className="mt-1 lg:mt-3"
                            value={firstName}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setFirstName(event.target.value)}
                        />
                        <Input
                            label={
                                <Label value="Lastname *"
                                    className="text-sm font-medium text-center"
                                    align="left"
                                />
                            }
                            placeholder="Enter your lastname"
                            className="mt-1 lg:mt-3"
                            value={lastName}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
                        <Input
                            label={
                                <Label value="Password *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            type={show ? "text" : "password"}
                            placeholder="Enter your password"
                            className="mt-1 lg:mt-3 rounded-xl"
                            svgRight={
                                <ToggleEye onToggle={(visible) => setShow(visible)} />
                            }
                            value={password}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                        />
                        <Input
                            label={
                                <Label value="Email *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            type="email"
                            placeholder="example@example.com"
                            className="mt-1 lg:mt-3 rounded-xl"
                            value={email}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 col-span-3 lg:grid-cols-2 gap-11">
                        <label className="flex flex-col">
                            <span className="mt-1 mb-2 text-sm font-bold lg:mt-3"> Rôles *</span>
                            <SelectionInput
                                options={rolesOptions}
                                placeholder="Select a Rôle"
                                onChange={handleRoleChange}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-1 col-span-3 mt-3 ">
                        <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                            <SubmitUser size={'1.3rem'} />
                            <div className="">Submit</div>
                        </Button>
                    </div>

                </form>
            </CardBody>
        </Card>
    );
};
export default CreateUserForm;