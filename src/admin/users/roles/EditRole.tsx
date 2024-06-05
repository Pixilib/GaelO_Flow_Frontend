import { Colors, Role, useCustomMutation, useCustomToast } from "../../../utils";
import { Card, CardBody, CardHeader, CloseButton } from "../../../ui";
import RoleForm from "./RoleForm";
import { updateRole } from "../../../services/users";

//! WIP

type EditRoleProps = {
  title: string;
  className?: string;
  onClose: () => void;
  role?: Role;
};

const EditRole = ({ title, className, onClose, role }: EditRoleProps) => {
  const { toastSuccess, toastError } = useCustomToast();

  const { mutate: roleMutation } = useCustomMutation<void, Role>(
    (role: Role) => updateRole(role),
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
      },
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
      <CardBody>
        <RoleForm
          onSubmit={handleSubmit}
          buttonText="Update"
          initialData={role}
        />
      </CardBody>
    </Card>
  );
};
export default EditRole;
