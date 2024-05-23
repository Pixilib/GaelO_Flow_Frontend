import { IoIosCloseCircle } from "react-icons/io";
import { Colors, RoleUser, useCustomMutation, useCustomToast } from "../../utils";
import { Card, CardBody, CardHeader } from "../../ui";
import RoleForm from "./RoleForm";
import { updateRole } from "../../services/users";


//! WIP

type EditRoleProps = {
    title: string;
    className?: string;
    onClose: () => void;
    role?: RoleUser;
};

const EditRole = ({ title, className, onClose, role }: EditRoleProps) => {
    const { toastSuccess, toastError } = useCustomToast();
 
    const { mutate: roleMutation } = useCustomMutation<void, RoleUser>(
        (roleUser:RoleUser) => updateRole(roleUser.Name, roleUser),
        [["roles"]],
        {
            onSuccess: () => {
                toastSuccess("Role updated successfully");
            },
            onError: (error: any) => {
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user updated.");
                }
            }
        }
    );


    const handleSubmit = (payload: RoleUser) => {
        roleMutation(payload);
    };        
    
    return (
        <Card className={`my-10 rounded-xl ${className}`} >
            <CardHeader title={title} color={Colors.success}>
                <IoIosCloseCircle
                    size={"1.7rem"}
                    onClick={() => onClose()}
                    className="mr-3 text-white transition cursor-pointer duration-70 hover:scale-110"
                />
            </CardHeader>
            <CardBody>
                <RoleForm onSubmit={handleSubmit} buttonText="Update" initialData={role} />
            </CardBody>
        </Card>
    );
};
export default EditRole;