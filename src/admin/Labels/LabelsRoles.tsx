import { ChangeEvent } from "react"
import { Role, useCustomMutation, useCustomQuery } from "../../utils"
import { getRoles, getRolesByLabelName } from "../../services"
import { Spinner } from "../../ui"
import { addLabelToRole, removeLabelFromRole } from "../../services/roles"

type LabelsRolesProps = {
    labelName: string
}
const LabelsRoles = ({ labelName }: LabelsRolesProps) => {

    const { data: roles, isLoading: isLoadingRoles } = useCustomQuery<Role[], string[]>(
        ['roles'],
        () => getRoles(),
        {
            select: (roles) => roles.map((role) => role.Name)
        }
    )

    const { data: existingRoles, isLoading: isLoadingExistingRoles } = useCustomQuery<string[]>(
        ['labels', labelName],
        () => getRolesByLabelName(labelName)
    )

    const { mutate: addRoleMutation } = useCustomMutation<void>(
        ({ role }) => addLabelToRole(role, labelName),
        [['labels', labelName]]
    )

    const {mutate : removeRoleMutation} = useCustomMutation<void>(
        ({ role }) => removeLabelFromRole(role, labelName),
        [['labels', labelName]]
    )

    const handleRoleChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
            addRoleMutation({ role: name })
        } else {
            removeRoleMutation({ role: name })
        }
    }

    if (isLoadingRoles || isLoadingExistingRoles) {
        return <Spinner />
    }

    return (
        <div className="flex justify-around w-80">
            {
                roles?.map((role) => {
                    return (
                        <div key={role} className="flex flex-col">
                            <label>{role}</label>
                            <input type="checkbox" name={role} checked={existingRoles?.includes(role)} onChange={(event) => handleRoleChange(role, event)} />
                        </div>
                    )
                })
            }
        </div>
    )

}

export default LabelsRoles