import { RolesUserResponse, useCustomQuery } from "../../utils";
import RolesTable from "./RolesTable";
import { getRoles } from "../../services/users";
import { Spinner } from "../../ui";



const Roles = () => {
    
    const { data: roles, isPending: isLoadingRoles } = useCustomQuery<RolesUserResponse>(
        ["roles"],
        () => getRoles(),
        {
            enabled: true,
        }
    );
    return (
        <div>
            {isLoadingRoles ? (
                <Spinner />
            ) : (
                <RolesTable 
                data={roles || []}
                onEdit={(roleId: number) => console.log(roleId??"")}
                // onDelete={(roleId: number) => console.log(roleId??"")}
                />
            )}
        </div>
    );
};
export default Roles;