import { updateRole } from "../../../services";
import { Colors, Role, useCustomMutation, useCustomToast } from "../../../utils";
import { Card, CardBody, CardHeader, CloseButton, FormCard } from "../../../ui";
import RoleForm from "./RoleForm";

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
    <FormCard title={title} className="bg-light" onClose={() => onClose()}>
      <RoleForm
        onSubmit={handleSubmit}
        buttonText="Update"
        initialData={role}
      />
    </FormCard>
  );
};
export default EditRole;
