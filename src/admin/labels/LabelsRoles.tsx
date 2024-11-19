import { ChangeEvent } from "react";
import { Role, useCustomMutation, useCustomQuery } from "../../utils";
import { getRoles, getRolesByLabelName } from "../../services";
import { Spinner } from "../../ui";
import { addLabelToRole, removeLabelFromRole } from "../../services/roles";
import Checkbox from "../../ui/Checkbox";
type LabelsRolesProps = {
  labelName: string;
};

const LabelsRoles = ({ labelName }: LabelsRolesProps) => {
  const { data: roles, isLoading: isRolesLoading, error: rolesError } = useCustomQuery<
    Role[],
    string[]
  >(["roles"], () => getRoles(), {
    select: (roles) => roles.map((role) => role.name),
  });

  const { data: existingRoles, isLoading: isExistingRolesLoading, error: existingRolesError } =
    useCustomQuery<string[]>(["labels", labelName], () =>
      getRolesByLabelName(labelName)
    );

  const { mutate: addRoleMutation, error: addRoleError } = useCustomMutation<void>(
    ({ role }) => addLabelToRole(role, labelName),
    [["labels", labelName]]
  );

  const { mutate: removeRoleMutation, error: removeRoleError } = useCustomMutation<void>(
    ({ role }) => removeLabelFromRole(role, labelName),
    [["labels", labelName]]
  );

  const handleRoleChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (checked) {
      if (!existingRoles?.includes(name)) {
        addRoleMutation({ role: name });
      }
    } else {
      removeRoleMutation({ role: name });
    }
  };

  if (isRolesLoading || isExistingRolesLoading) {
    return <Spinner />;
  }

  if (rolesError || existingRolesError) {
    return <div>Erreur de chargement des données</div>;
  }

  if (addRoleError || removeRoleError) {
    return <div>Erreur de mutation</div>;
  }

  return (
    <div className="flex flex-col w-80">
      {roles?.map((role) => {
        return (
          <div key={role} className="flex items-center gap-2 my-2">
            <Checkbox
              name={role}
              checked={existingRoles?.includes(role)}
              onChange={(event) => handleRoleChange(role, event)}
            />
            <label>{role}</label>
          </div>
        );
      })}
    </div>
  );
};

export default LabelsRoles;