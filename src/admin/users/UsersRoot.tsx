import { useNavigate } from "react-router-dom";

import { Spinner, Tabs } from "../../ui";
import { getUsers } from "../../services/users";
import { useCustomQuery } from "../../utils/reactQuery";
import { UserResponse } from "../../utils/types";
import UsersTable from "./UsersTable";

//!WIP 
const UsersRoot = () => {
    const navigate = useNavigate();
    const { data: users, isPending: isLoadingUsers } = useCustomQuery<UserResponse>(
        ["users"],
        () => getUsers(),
        {
            enabled: true,
            refetchInterval: 10000,
        }
    )

    const UsersDisplay = () => {
        return isLoadingUsers ? <Spinner /> : <UsersTable data={users as UserResponse} />
    }
    
    const tabs = [
        { title: 'Local Users', path: 'local', Component: () => <UsersDisplay /> },
        { title: 'Roles', path: 'roles', Component: () => <></> },
    ];

    const handleTabClick = (path: string) => {
        navigate(path)
    }

    return (
        <div className="mx-12 rounded-xl">
            <Tabs tabs={tabs} variant="basic" onTabClick={handleTabClick} className={`bg-[#EFEFEF]`} />
        </div>
    );
}
export default UsersRoot;