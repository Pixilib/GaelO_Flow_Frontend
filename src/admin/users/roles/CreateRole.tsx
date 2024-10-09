import { Card, CardBody, CardHeader, CloseButton, FormCard } from "../../../ui";
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
      },
    }
  );

  const handleSubmit = (payload: Role) => {
    roleMutation(payload);
  };

  return (
    <FormCard title={title} onClose={() => onClose()}>
      <RoleForm onSubmit={handleSubmit} buttonText="Submit" />
    </FormCard>

  );
};

export default CreateRole;
