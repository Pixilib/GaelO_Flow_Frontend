import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Tabs, Tab } from "../../ui";

import Roles from "./roles/Roles";
import Users from "./user/Users";
import Oauth2 from "./oauth/Oauth";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }

    return (
        <div 
        className="max-h-full mx-12 my-12 shadow-md rounded-xl"
        data-gaelo-flow="users-root"
        >
            <Tabs className=" bg-light-gray">
                <Tab
                    title="Users"
                    active={path.endsWith("crud")}
                    onClick={() => handleTabClick("crud")}
                />
                <Tab
                    title="Rôles"
                    active={path.endsWith("roles")}
                    onClick={() => handleTabClick("roles")}
                />
                <Tab
                    title="Oauth2"
                    active={path.endsWith("oauth2")}
                    onClick={() => handleTabClick("oauth2")}
                />
            </Tabs>
            
            <Routes>
                <Route path="/users" element={<Users/>} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/oauth2" element={<Oauth2 />} />
            </Routes>
        </div>
    );
}

export default UsersRoot;
