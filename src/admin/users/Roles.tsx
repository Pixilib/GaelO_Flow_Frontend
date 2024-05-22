import { Colors, RolesUserResponse, useCustomQuery } from "../../utils";
import RolesTable from "./RolesTable";
import { getRoles } from "../../services/users";
import { Button, Spinner } from "../../ui";
import { BsPersonPlusFill as CreateRole } from "react-icons/bs";
import { useState } from "react";
import CreateRoleForm from "./CreateRoleForm";




const Roles = () => {
    const [showCreateRoleForm, setShowCreateRoleForm] = useState(false);
    const { data: roles, isPending: isLoadingRoles } = useCustomQuery<RolesUserResponse>(
        ["roles"],
        () => getRoles(),
        {
            enabled: true,
        }
    );
    return (
        <div className="">
            {isLoadingRoles ? (
                <Spinner />
            ) : (
                <RolesTable
                    data={roles || []}
                    onEdit={(roleId: number) => console.log(roleId ?? "")}
                // onDelete={(roleId: number) => console.log(roleId??"")}
                />
            )}
            {showCreateRoleForm &&
                <CreateRoleForm title={"Create Role"} className="bg-[#EFEFEF]" onClose={() => (setShowCreateRoleForm(false))} />}

            <div className="flex justify-center mx-10 mb-10">
                {!showCreateRoleForm && (
                    <Button
                        color={Colors.success}
                        onClick={() => setShowCreateRoleForm(true)}
                        className="flex justify-center gap-4 w-52 h-11 hover:successHover "
                    >
                        <CreateRole size={'1.3rem'} className="" />
                        Create Role
                    </Button>
                )}
            </div>
        </div>
    );
}
export default Roles;