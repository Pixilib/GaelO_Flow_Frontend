import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui"; // En supposant que Tab est également exporté
import LocalUsers from "./LocalUsers";

const UsersRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }
    
    return (
        <div className="mx-12 shadow-md rounded-xl">
            <Tabs className="bg-light-gray">
                <Tab 
                title="local Users" 
                active={path.endsWith("local")} 
                onClick={()=> handleTabClick("local")}
                />
                <Tab 
                title="Rôles"
                active={path.endsWith("roles")}
                onClick={()=> navigate("roles")}
                />
            </Tabs>
            <Routes>
                <Route path="local" element={<LocalUsers />} />
                {/* <Route path="roles" element={} /> */}
            </Routes>
        </div>
    );
}

export default UsersRoot;
