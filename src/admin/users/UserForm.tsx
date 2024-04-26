import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Label, SelectionInput, ToggleEye } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomQuery } from "../../utils/reactQuery";
import { getRoles } from "../../services/users";
import { RolesUserResponse } from "src/utils/types";

type UserFormProps = {
    title: string;
    className: string
    onClose: () => void
}

//!WIP 
const UserForm = ({ title, className, onClose }: UserFormProps) => {
    const [show, setShow] = useState(false);
    const { data: roles } = useCustomQuery<RolesUserResponse>(
        ["roles"], () => getRoles(),
        {
            enabled: true,
            refetchInterval: 40000,
        }
    );

    const rolesOptions = roles ? roles.map((role) => {
        return {
            value: role.Name,
            label: role.Name
        }
    }) : [];

    

    return (
        <Card className={`mt-10 ${className}`}>
            <CardHeader title={title} color={Colors.success} >
                <IoIosCloseCircle size={"1.7rem"}
                    onClick={() => onClose()}
                    className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
                />
            </CardHeader>

            <CardBody color={Colors.lightGray}>
                <form className="grid gap-y-4">
                    <div className="grid grid-cols-1 col-span-3 md:grid-cols-3 gap-11">
                        <Input
                            label={
                                <Label value="Username *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            placeholder="Enter your username"
                            className="mt-3"
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
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 col-span-3 md:grid-cols-2 gap-11">
                        <label className="flex flex-col">
                            <span className="mb-2 text-sm font-bold"> Rôles *</span>
                            <SelectionInput options={rolesOptions} placeholder="Select a Rôle" />
                        </label>

                        <label htmlFor="superAdmin" className="flex items-center">
                            <input type="checkbox" id="superAdmin" defaultChecked={false} />
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