import { Tabs, Tab, Card, CardBody, CardFooter, Button } from "../../ui";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Roles from "./roles/Roles";
import Users from "./user/Users";
import Oauth2 from "./oauth/Oauth";
import { Colors } from "../../utils";
import { BsPersonPlusFill as CreateUser } from "react-icons/bs";
import { useState } from "react";
import CreateUserForm from "./user/CreateUserForm";
import CreateRole from "./roles/CreateRole";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isCreatingRole, setIsCreatingRole] = useState(false);

    const handleTabClick = (tab: string) => {
        navigate(tab);
    };

    const isUsersPath = path.endsWith("users");
    const isRolesPath = path.endsWith("roles");
    const isOauth2Path = path.endsWith("oauth2");

    return (
        <Card className="bg-white shadow-md rounded-xl" data-gaelo-flow="users-root">
            <Tabs className="bg-light-gray rounded-t-xl">
                <Tab
                    title="Users"
                    active={isUsersPath}
                    onClick={() => handleTabClick("users")}
                />
                <Tab
                    title="Rôles"
                    active={isRolesPath}
                    onClick={() => handleTabClick("roles")}
                />
                <Tab
                    title="Oauth2"
                    active={isOauth2Path}
                    onClick={() => handleTabClick("oauth2")}
                />
            </Tabs>
            <CardBody
                color={Colors.almond}
                roundedTopLeft={false}
                roundedTopRight={false}
                roundedBottomLeft={false}
                roundedBottomRight={false}
            >
                <Routes>
                    <Route path="/users" element={<Users isCreating={isCreatingUser} setIsCreating={setIsCreatingUser} />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/oauth2" element={<Oauth2 />} />
                </Routes>
            </CardBody>
            <CardFooter className="flex flex-col items-center border-t-2 shadow-inner border-indigo- bg-light">
                {/* Footer pour Users */}
                {isUsersPath && (
                    <>
                        {!isCreatingUser && (
                            <Button
                                color={Colors.success}
                                onClick={() => setIsCreatingUser(true)}
                                className="flex justify-center gap-4 mb-4 w-52 hover:successHover"
                            >
                                <CreateUser size={"1.3rem"} />
                                Create User
                            </Button>
                        )}
                        {isCreatingUser && (
                            <CreateUserForm
                                title={"Create User"}
                                onClose={() => setIsCreatingUser(false)}
                            />
                        )}
                    </>
                )}

                {/* Footer pour Roles */}
                {isRolesPath && (
                    <>
                        {!isCreatingRole && (
                            <Button
                                color={Colors.success}
                                onClick={() => setIsCreatingRole(true)}
                                className="flex justify-center gap-4 mb-4 w-52 hover:successHover"
                            >
                                <CreateUser size={"1.3rem"} />
                                Create Role
                            </Button>
                        )}
                        {isCreatingRole && (
                            <CreateRole
                                title={"Create Role"}
                                onClose={() => setIsCreatingRole(false)}
                            />
                        )}
                    </>
                )}

                {/* Footer pour OAuth2 */}
                {isOauth2Path && (
                    <>
                        {/* Ajoutez ici le contenu spécifique pour OAuth2 si nécessaire */}
                    </>
                )}
            </CardFooter>
        </Card>
    );
};

export default UsersRoot;
