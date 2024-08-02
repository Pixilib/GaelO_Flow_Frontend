import { useState } from "react";
import { BsPersonPlusFill as RoleCreate } from "react-icons/bs";

import { deleteRole, getRoles } from '../../../services';
import { useConfirm } from "../../../services/ConfirmContextProvider";

import { Colors, Role, useCustomMutation, useCustomQuery, useCustomToast } from "../../../utils";

import RolesTable from "./RolesTable";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import { Button, Spinner } from "../../../ui";

const Roles = () => {
    const { toastSuccess, toastError } = useCustomToast();
    const { confirm } = useConfirm();

    const [showRoleForm, setShowRoleForm] = useState<'create' | 'edit' | null>(null);
    const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

    const { data: roles, isPending: isLoadingRoles } = useCustomQuery<Role[]>(
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

    const findRole = (roleName: string): Role => {
        const role = roles?.find((role: { Name: string; }) => role.Name === roleName);
        return role || {} as Role;
    }
    const handleEditRole = (roleName: string) => {
        const role = findRole(roleName);
        setRoleToEdit(role);
        setShowRoleForm('edit');
    }

    const deleteRoleHandler = async (roleName: string) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this rôle:
                <span className="text-xl not-italic font-bold text-primary"> {roleName} ?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            deleteMutation.mutate(roleName);
        }
    }


    return (
        <div className=" rounded-br-xl rounded-bl-xl">
            {isLoadingRoles ? (
                <Spinner />
            ) : (
                <RolesTable
                    data={roles || []}
                    onEdit={handleEditRole}
                    onDelete={deleteRoleHandler}
                />
            )}
            {showRoleForm === 'create' &&
                <CreateRole title={"Create Role"}
                    className="bg-[#EFEFEF]" onClose={() => (setShowRoleForm(null))} />
            }
            {showRoleForm === 'edit' &&
                <EditRole title={"Edit Role"}
                    className="bg-[#EFEFEF]"
                    onClose={() => { setShowRoleForm(null); setRoleToEdit(null); }}
                    role={roleToEdit || undefined}
                />
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