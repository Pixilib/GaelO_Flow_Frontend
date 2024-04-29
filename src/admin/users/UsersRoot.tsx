import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui"; // En supposant que Tab est également exporté
import LocalUsers from "./LocalUsers";
import EditUserForm from "./EditUserForm";
import CreateUserForm from "./CreateUserForm";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;



    const handleTabClick = (tab: string) => {
        navigate(tab);
    }
    return (
        <div className="h-full mx-12 shadow-md rounded-xl">
            <Tabs className="bg-light-gray">
                <Tab
                    title="local Users"
                    active={path.startsWith("local/")}
                    onClick={() => handleTabClick("local")}
                />
                <Tab
                    title="Rôles"
                    active={path.endsWith("roles")}
                    onClick={() => navigate("roles")}
                />
            </Tabs>
            <Routes>
                <Route path="local" element={<LocalUsers />} />
                <Route
                    path="local/create"
                    element={
                        <CreateUserForm
                            title="Create User"
                            onClose={() => navigate(-1)}
                        />
                    }
                />
                <Route
                    path="local/edit"
                    element={
                        <EditUserForm
                            title="Edit User"
                            onClose={() => navigate(-1)}
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default UsersRoot;
