import { BsFillPersonXFill as DeleteUser  } from "react-icons/bs"; 
import { BsPersonCheckFill as SubmitUser } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader, Input, Label, SelectInput } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { deleteUser, getRoles, updateUser } from "../../services/users";
import { RolesUserResponse, UserUpdatePayload } from '../../utils/types';
import { useCustomToast } from "../../utils/toastify";
import { useLocation, useNavigate } from "react-router-dom";


type UserFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
}
//!WIP 
const EditUserForm = ({ title, className, onClose}: UserFormProps) => {
    const location = useLocation();
    const user = location.state?.user;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<{ value: string, label: string } | null>(null);
    
    const { toastSuccess, toastError } = useCustomToast()
    const navigate = useNavigate();
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
    
    useEffect(() => {
        if (user) {
            // Pre-fill form when editing
            setFirstName(user.Firstname);
            setLastName(user.Lastname);
            setEmail(user.Email);
            if(user && rolesOptions) {
                setSelectedRole({value:user.RoleName, label:user.RoleName} || "");
            }
        }
    }, [user]);

    
    const userUpdateMutation = useCustomMutation<void, UserUpdatePayload>(
        (payload) => updateUser(parseInt(user.Id), payload),
        [["users"]],
        {
            onSuccess: () => {
                toastSuccess("User updated with success");
            },
            onError: (error: any) => {
                console.log(error); 
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user update.");
                }
            },
        }
    )
    
    const userDeleteMutation = useCustomMutation<void, number>(
        (id) => deleteUser(id),
        [["users"]],
        {
            onSuccess: () => {
                toastSuccess("User deleted with success");
            },
            onError: (error: any) => {
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user deletion.");
                }
            },
        }
    )


    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({selectedRole});
  
        const payload: UserUpdatePayload = {
            Firstname: firstName,
            Lastname: lastName,
            Email: email,
            RoleName: selectedRole?.value,
        };
        if (user) {
            try {
                userUpdateMutation.mutate(payload);
                navigate("/administration/users/local");
            }catch(e) {
                console.log(e);
            }
        } 
        return;
    }
    
    const handleDelete = () => {
        if (user) {
            try {
                userDeleteMutation.mutate(parseInt(user.Id));
                navigate("/administration/users/local");
            }catch(e) {
                console.log(e);
            }
        } 
        return;
    }
    
    return (
        <Card className={`my-10 ${className}`}>
            <CardHeader title={title} color={Colors.success} >
                <IoIosCloseCircle size={"1.7rem"}
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
                                <Label value="Email *"
                                    className="text-sm font-medium text-center"
                                    align="left" />
                            }
                            size="auto"
                            type="email"
                            placeholder="example@example.com"
                            className="mt-1 lg:mt-3 rounded-xl"
                            value={email}
                            required
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                        />
                        <label className="flex flex-col">
                            <span className="mt-1 mb-2 text-sm font-bold lg:mt-3"> Rôles *</span>
                            <SelectInput
                                options={rolesOptions}
                                placeholder="Select a Rôle"
                                onChange={(event) => {
                                    setSelectedRole({ value: event.value, label: event.value });
                                }}
              
                                value={selectedRole}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-2 col-span-3 mt-3">
                        <Button color={Colors.danger} className="h-12 gap-3 justify-self-center w-36 md:justify-center" onClick={handleDelete}>
                            <DeleteUser size={'1.3rem'} />
                            <div className="">Delete</div>
                        </Button>
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
export default EditUserForm;