import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Tabs, Tab } from "../../ui";

import Roles from "./Roles";
import Users from "./Users";
import Oauth2 from "./Oauth";

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
                <Route path="/crud" element={<Users/>} />
                <Route path="/roles" element={<Roles />} />
                <Route path="/oauth2" element={<Oauth2 />} />
            </Routes>
        </div>
    );
}

export default UsersRoot;
