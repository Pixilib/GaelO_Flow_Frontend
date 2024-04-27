import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { ChangeEvent, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Label, SelectionInput, ToggleEye } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getRoles, postUsers } from "../../services/users";
import { RolesUserResponse, UserPayload } from '../../utils/types';
import { useCustomToast } from "../../utils/toastify";

type UserFormProps = {
    title: string;
    className: string
    onClose: () => void
}

//!WIP 
const UserForm = ({ title, className, onClose }: UserFormProps) => {
    const [show, setShow] = useState(false);
    const [userName, setUserName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);

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
        ({ Username, Firstname, Password, Lastname, Email, RoleName, SuperAdmin }) =>
            postUsers({ Username, Firstname, Password, Lastname, Email, RoleName, SuperAdmin }),
        [["users"]],
        {
            onSuccess: () => {
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
        userMutation.mutate({
            Username: userName,
            Firstname: firstName,
            Lastname: lastName,
            Password: password,
            Email: email,
            RoleName: selectedRole,
            SuperAdmin: isSuperAdmin
        });
    }
    return (
        <Card className={`mt-10 ${className} overflow-y-auto`}>
            <CardHeader title={title} color={Colors.success} >
                <IoIosCloseCircle size={"1.7rem"}
                    onClick={() => onClose()}
                    className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
                />
            </CardHeader>

            <CardBody color={Colors.lightGray}>
                <form onSubmit={handleSubmit} className="grid gap-y-4">
                    <div className="grid grid-cols-1 col-span-3 md:grid-cols-3 gap-11">
                        <Input
                            label={
                                <Label value="Username *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            placeholder="Enter your username"
                            className="mt-3"
                            value={userName}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                        />
                        <Input
                            label={
                                <Label value="Firstname *"
                                    className="text-sm font-medium text-center"
                                    align="left"
                                />
                            }
                            placeholder="Enter your firstname"
                            className="mt-3"
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
                            className="mt-3"
                            value={lastName}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setLastName(event.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 col-span-3 md:grid-cols-2 gap-11">
                        <Input
                            label={
                                <Label value="Password *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            size="auto"
                            type={show ? "text" : "password"}
                            placeholder="Enter your password"
                            className="mt-3 rounded-xl"
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
                            size="auto"
                            type="email"
                            placeholder="example@example.com"
                            className="mt-3 rounded-xl"
                            value={email}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 col-span-3 md:grid-cols-2 gap-11">
                        <label className="flex flex-col">
                            <span className="mb-2 text-sm font-bold"> Rôles *</span>
                            <SelectionInput
                                options={rolesOptions}
                                placeholder="Select a Rôle"
                                onChange={handleRoleChange}
                            />
                        </label>

                        <label htmlFor="superAdmin" className="flex items-center">
                            <input type="checkbox"
                                id="superAdmin"
                                defaultChecked={false}
                                checked={isSuperAdmin}
                                onChange={(event) => setIsSuperAdmin(event.target.checked)}
                            />
                            <span className="ml-2">Super Admin</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 col-span-3 mt-3 ">
                        <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                            <SubmitUser size={'1.3rem'} />
                            <div className="">Create</div>
                        </Button>
                    </div>

                </form>
            </CardBody>
        </Card>
    );
};
export default UserForm;