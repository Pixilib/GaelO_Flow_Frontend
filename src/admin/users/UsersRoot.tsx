import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Tabs, Tab } from "../../ui";

import LocalUsers from "./LocalUsers";
import EditUserForm from "./EditUserForm";
import CreateUserForm from "./CreateUserForm";
import Roles from "./Roles";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    
    const handleTabClick = (tab: string) => {
        navigate(tab);
    }
    
    return (
        <div className="mx-12 my-12 shadow-md rounded-xl">
            <Tabs className=" bg-light-gray">
                <Tab
                    title="local Users"
                    active={path.startsWith("/administration/users/local")}
                    onClick={() => handleTabClick("local")}
                />
                <Tab
                    title="Rôles"
                    active={path.endsWith("roles")}
                    onClick={() => handleTabClick("roles")}
                />
            </Tabs>
            <Routes>
                <Route
                    path="/local/create"
                    element={
                        <CreateUserForm
                            title="Create User"
                            className="bg-[#EFEFEF]"
                            onClose={() => navigate(-1)}
                        />
                    }
                />
                <Route
                    path="/local/edit"
                    element={
                        <EditUserForm
                            title="Edit User"
                            className="bg-white"
                            onClose={() => navigate(-1)}
                        />
                    }
                />
                <Route path="/local" element={<LocalUsers />} />
                <Route path="/roles" element={<Roles />} />
            </Routes>
        </div>
    );
}

export default UsersRoot;
