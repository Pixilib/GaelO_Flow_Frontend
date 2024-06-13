import { ChangeEvent, useEffect } from "react"
import { Role, useCustomQuery } from "../../utils"
import { getRoles, getRolesByLabelName } from "../../services"
import { Spinner } from "../../ui"

type LabelsRolesProps = {
    labelName: string
}
const LabelsRoles = ({ labelName }: LabelsRolesProps) => {

    useEffect(() => {
        console.log("mounted")
        return (
            console.log('unmounted')
        )
    }, [])

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

    const handleRoleChange = (name: string, event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        if (checked) {
            //onAddRole(name)
        } else {
            //onRemoveRole(name)
        }
    }

    console.log(existingRoles, roles)
    if (isLoadingRoles || isLoadingExistingRoles) {
        return <Spinner />
    }

    return (
        <div>
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