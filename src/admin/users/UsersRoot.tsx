import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui"; // En supposant que Tab est également exporté
import LocalUsers from "./LocalUsers";

const UsersRoot = () => {
    const navigate = useNavigate();


    return (
        <div className="mx-12 rounded-xl">
            <Tabs className="bg-[#EFEFEF]">
                <Tab title="Local Users" />
                <Tab title="Rôles" } />
            </Tabs>
        </div>
    );
}

export default UsersRoot;
