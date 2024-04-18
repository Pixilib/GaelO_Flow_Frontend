import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui"; // En supposant que Tab est également exporté
import LocalUsers from "./LocalUsers";

const UsersRoot = () => {
    const navigate = useNavigate();


    const handleTabClick = (path?: string) => {
        if (path) {
            navigate(path);
        }
    };
    return (
        <div className="mx-12 rounded-xl">
            <Tabs variant="basic" onTabClick={handleTabClick} className="bg-[#EFEFEF]">
                <Tab title="Local Users" path="local" component={LocalUsers} />
                <Tab title="Rôles" path="roles" component={() => <div>Zone de gestion des rôles</div>} />
            </Tabs>
        </div>
    );
}

export default UsersRoot;
