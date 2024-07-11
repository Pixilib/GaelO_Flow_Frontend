import { Card, CardBody, CardHeader, CloseButton } from "../../../ui";
import { postRoles } from "../../../services";
import { useCustomMutation, useCustomToast, Colors } from "../../../utils";
import { Role } from "../../../utils/types";
import RoleForm from "./RoleForm";

type CreateRoleFormProps = {
    title: string;
    className?: string;
    onClose: () => void;
};

const CreateRole = ({ title, className, onClose }: CreateRoleFormProps) => {
    const { toastSuccess, toastError } = useCustomToast();

    const { mutate: roleMutation } = useCustomMutation<void, Role>(
        (payload) => postRoles(payload),
        [["roles"]],
        {
            onSuccess: () => {
                toastSuccess("Role created successfully");
            },
            onError: (error: any) => {
                if (error.data.message) {
                    toastError(error.data.message);
                } else {
                    toastError("An error occurred during user creation.");
                }
            }
        }
    );

    const handleSubmit = (payload: Role) => {
        roleMutation(payload);
    };

    return (
        <Card className={`my-10 rounded-xl ${className}`}>
            <CardHeader title={title} color={Colors.success}>
            <CloseButton onClose={() => onClose()} />
            </CardHeader>
            <CardBody className="bg-gray-100">                <RoleForm onSubmit={handleSubmit} buttonText="Submit" />
            </CardBody>
        </Card>
    );
};

export default CreateRole;
