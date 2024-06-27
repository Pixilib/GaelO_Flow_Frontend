import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Card, CardBody } from "../../ui";
import Roles from "./roles/Roles";
import Users from "./user/Users";
import Oauth2 from "./oauth/Oauth";
import { Colors } from "../../utils";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }

    return (
        <Card className="mx-12 mt-12 bg-white shadow-md rounded-xl" data-gaelo-flow="users-root">
            <Tabs className="bg-light-gray rounded-t-xl">
                <Tab
                    title="Users"
                    active={path.endsWith("users")}
                    onClick={() => handleTabClick("users")}
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
            <CardBody
                color={Colors.light}
                roundedTopLeft={false}
                roundedTopRight={false}
                roundedBottomLeft
                roundedBottomRight
            >
                <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Manage Users</h2>
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/oauth2" element={<Oauth2 />} />
                </Routes>
            </CardBody>
        </Card>
    );
}

export default UsersRoot;
