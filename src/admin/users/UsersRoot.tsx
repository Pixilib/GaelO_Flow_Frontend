import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Tabs, Tab, Card, CardBody } from "../../ui";
import { Colors } from "../../utils";
import Roles from "./roles/Roles";
import Users from "./user/Users";
import Oauth2 from "./oauth/Oauth";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate('/administration/users/' + tab);
    };

    const isUsersPath = path.endsWith("users");
    const isRolesPath = path.endsWith("roles");
    const isOauth2Path = path.endsWith("oauth2");

    return (
        <Card className="bg-white shadow-md rounded-2xl" data-gaelo-flow="users-root">
            <Tabs className=" bg-light-gray rounded-t-2xl">
                <Tab
                    title="Users"
                    active={isUsersPath}
                    onClick={() => handleTabClick("users")}
                />
                <Tab
                    title="Roles"
                    active={isRolesPath}
                    onClick={() => handleTabClick("roles")}
                />
                <Tab
                    title="Oauth2"
                    active={isOauth2Path}
                    onClick={() => handleTabClick("oauth2")}
                />
            </Tabs>
            <CardBody noPadding
                color={Colors.almond}
                roundedTopLeft={false}
                roundedTopRight={false}
                roundedBottomLeft={false}
                roundedBottomRight={false}
                className="rounded-br-2xl rounded-bl-2xl dark:bg-neutral-500">
                <Routes>
                    <Route path="/users" element={<Users />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/oauth2" element={<Oauth2 />} />
                </Routes>
            </CardBody>

        </Card>
    );
};

export default UsersRoot;
