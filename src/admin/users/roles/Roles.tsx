import { useState } from "react";
import { deleteRole, getRoles } from '../../../services';
import { useConfirm } from "../../../services/ConfirmContextProvider";
import { Colors, Role, useCustomMutation, useCustomQuery, useCustomToast } from "../../../utils";
import RolesTable from "./RolesTable";
import CreateRole from "./CreateRole";
import EditRole from "./EditRole";
import { Button, CardFooter, Spinner } from "../../../ui";

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
                toastSuccess("Role deleted successfully");
            },
            onError: () => {
                toastError("Role deletion failed");
            },
        }
    );

    const findRole = (roleName: string): Role => {
        const role = roles?.find((role: { name: string }) => role.name === roleName);
        return role || {} as Role;
    };

    const handleEditRole = (roleName: string) => {
        const role = findRole(roleName);
        setRoleToEdit(role);
        setShowRoleForm('edit');
    };

    const deleteRoleHandler = async (roleName: string) => {
        const confirmContent = (
            <div className="italic">
                Are you sure you want to delete this role:
                <span className="text-xl not-italic font-bold text-primary"> {roleName}?</span>
            </div>
        );
        if (await confirm({ content: confirmContent })) {
            deleteMutation.mutate(roleName);
        }
    };

    if (isLoadingRoles) return <Spinner />;

    return (
        <div className="flex flex-col justify-center">
            <RolesTable
                data={roles || []}
                onEdit={handleEditRole}
                onDelete={deleteRoleHandler}
            />

            {showRoleForm === 'edit' && (
                <EditRole
                    key={roleToEdit?.name}
                    title={"Edit Role"}
                    className="bg-gray-200"
                    onClose={() => { setShowRoleForm(null); setRoleToEdit(null); }}
                    role={roleToEdit || undefined}
                />
            )}

            <CardFooter className="p-0 border-t rounded-b-lg bg-light">
                <div className="flex justify-center w-full">
                    {!showRoleForm ? (
                        <Button
                            color={Colors.success}
                            onClick={() => setShowRoleForm('create')}
                            className="flex justify-center gap-4 mt-4 mb-4 w-52 hover:successHover"
                        >
                            Create Role
                        </Button>
                    ) : (
                        <CreateRole
                            title={"Create Role"}
                            className="w-full p-4"
                            onClose={() => setShowRoleForm(null)}
                        />
                    )}
                </div>
            </CardFooter>
        </div>
    );
};

export default Roles;
