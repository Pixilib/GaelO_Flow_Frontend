import { ChangeEvent, useEffect, useState } from "react";

import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";

import { useCustomToast, Colors, useCustomMutation, useCustomQuery, UserUpdatePayload, User, Role, Option } from "../../../utils";
import { getRoles, updateUser } from "../../../services";

import { Button, Card, CardBody, CardHeader, CloseButton, Input, Label, SelectInput } from "../../../ui";


type UserFormProps = {
    title: string;
    className?: string;
    userData: User;
    onClose: () => void;
}
const EditUserForm = ({ title, className, userData, onClose }: UserFormProps) => {
    const user = userData;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<{ value: string, label: string } | null>(null);

    const { toastSuccess, toastError } = useCustomToast()

    const { data: rolesOptions } = useCustomQuery<Role[], Option[]>(
        ["roles"],
        getRoles,
        {
            select: (roles) => roles.map((role) => ({
                value: role.name,
                label: role.name,
            })),
        }
    );

    useEffect(() => {
        if (user) {
            // Pre-fill form when editing
            setFirstName(user.firstname);
            setLastName(user.lastname);
            setEmail(user.email);
            if (user && rolesOptions) {
                setSelectedRole({ value: user.roleName, label: user.roleName } || "");
            }
        }
    }, [JSON.stringify(user), JSON.stringify(rolesOptions)]);


    const userUpdateMutation = useCustomMutation<void, UserUpdatePayload>(
        (payload) => updateUser((user.id), payload),
        [["users"]],
        {
            onSuccess: () => {
                toastSuccess("User updated with success");
            },
            onError: (error: any) => {
                toastError(
                    "An error occurred during user creation." + (error.data.message ?? "")
                );
            },
        }
    )

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedRole) {
            toastError("Please select a role");
            return;
        }
        const payload: UserUpdatePayload = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            roleName: selectedRole.value,
        };
        userUpdateMutation.mutate(payload);
    }

    return (
        <Card className={`my-10 ${className}`}>
            <CardHeader title={title} color={Colors.success} >
                <CloseButton onClose={() => onClose()} />
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
                            autoComplete='off'
                        />
                    </div>
                    <div className="grid grid-cols-1 col-span-3 gap-3 lg:grid-cols-2 lg:gap-11">
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
                            autoComplete={'off'}
                        />
                        <label className="flex flex-col">
                            <span className="mt-1 mb-2 text-sm font-bold lg:mt-3"> Rôles *</span>
                            <SelectInput
                                options={rolesOptions ?? []}
                                placeholder="Select a Role"
                                onChange={(event) => {
                                    setSelectedRole({ value: event.value, label: event.value });
                                }}
                                value={selectedRole}
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 col-span-3 mt-3">
                        <Button color={Colors.success} className="h-12 gap-3 justify-self-center w-36 md:justify-center" type="submit">
                            <SubmitUser size={'1.3rem'} />
                            <div>Update</div>
                        </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};
export default EditUserForm;