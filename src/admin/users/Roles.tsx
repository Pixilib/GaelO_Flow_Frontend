import { useState } from "react";
import { BsPersonPlusFill as RoleCreate } from "react-icons/bs";

import { deleteRole, getRoles } from "../../services/users";
import { Colors, RoleUser, RolesUserResponse, useCustomMutation, useCustomQuery, useCustomToast } from "../../utils";

import RolesTable from "./RolesTable";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import { Button, Spinner } from "../../ui";




const Roles = () => {
    const [showRoleForm, setShowRoleForm] = useState<'create' | 'edit' | null>(null);
    const [roleToEdit, setRoleToEdit] = useState<RoleUser | null>(null);
    const { toastSuccess, toastError } = useCustomToast();
    const { data: roles, isPending: isLoadingRoles } = useCustomQuery<RolesUserResponse>(
        ["roles"],
        () => getRoles(),
        {
            enabled: true,
        }
    );

    const deleteMutation = useCustomMutation<void, string>(
        (roleName: string) => deleteRole(roleName),
        [["roles"]],
        {
            onSuccess: () => {
                toastSuccess("Role deleted with success");
            },
            onError: () => {
                toastError("Role deletion failed");
            },
        }
    )

    const findRole = (roleName: string): RoleUser => {
        const role = roles?.find((role) => role.Name === roleName);
        return role || {} as RoleUser;
    }
    const handleEditRole = (roleName: string) => {
        const role = findRole(roleName);
        setRoleToEdit(role);
        setShowRoleForm('edit');
    }
    const handleDeleteRole = (roleName: string) => {
        const confirmation = window.confirm("Are you sure you want to delete this role?");
        if (confirmation) {
            deleteMutation.mutate(roleName);
        }
    }


    return (
        <div className="">
            {isLoadingRoles ? (
                <Spinner />
            ) : (
                <RolesTable
                    data={roles || []}
                    onEdit={handleEditRole}
                    onDelete={handleDeleteRole}
                />
            )}
            {showRoleForm === 'create' &&
                <CreateRole title={"Create Role"}
                    className="bg-[#EFEFEF]" onClose={() => (setShowRoleForm(null))} />
            }
            {showRoleForm === 'edit' &&
                <EditRole title={"Edit Role"}
                    className="bg-[#EFEFEF]" onClose={() => { setShowRoleForm(null); setRoleToEdit(null); }}
                    role={roleToEdit || undefined} />
            }
            <div className="flex justify-center mx-10">
                {showRoleForm === null && (
                    <Button
                        color={Colors.success}
                        onClick={() => setShowRoleForm('create')}
                        className="flex justify-center gap-4 my-10 w-52 h-11 hover:successHover "
                    >
                        <RoleCreate size={'1.3rem'} />
                        Create Role
                    </Button>
                )}
            </div>
        </div>
    );
}
export default Roles;