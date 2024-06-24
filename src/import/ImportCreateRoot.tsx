import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Tabs,Card, CardBody } from "../ui";
import ImportDrop from "./Import/ImportDrop";
import CreateDrop from "./Create/CreateDrop";
import { Tab } from "../ui";
import { Colors } from "../utils";


const ImportCreateRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }

    return (
        <div className="my-6">
            <form className="p-4 mx-6 bg-white shadow-md rounded-xl" data-gaelo-flow="users-root">
                <Tabs className="bg-primary">
                    <Tab
                        title="Import Dicom"
                        active={path.endsWith("import")}
                        onClick={() => handleTabClick("")}
                    />
                    <Tab
                        title="Create Dicom"
                        active={path.endsWith("createdicom")}
                        onClick={() => handleTabClick("create")}
                    />
                </Tabs>
                
                <div className="mt-4"> {/* Espace au-dessus du formulaire */}
                    <Routes>
                        <Route path="/" element={<ImportDrop />} />
                        <Route path="/create" element={<CreateDrop />} />
                    </Routes>
                </div>
            </form>
        </div>
    );
}

export default ImportCreateRoot;