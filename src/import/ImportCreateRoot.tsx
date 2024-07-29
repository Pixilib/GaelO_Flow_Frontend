import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../ui";

import CreateRoot from "./Create/CreateRoot";
import ImportRoot from "./Import/ImportRoot";

const ImportCreateRoot = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (tab: string) => {
        navigate(tab);
    };

    return (
        <div className="shadow-md bg-almond rounded-xl" data-gaelo-flow="import-create-root">
            <Tabs className="bg-primary rounded-t-xl">
                <Tab
                    title="Import Dicom"
                    active={location.pathname.endsWith('/import')}
                    onClick={() => handleTabClick("")}
                />
                <Tab
                    title="Create Dicom"
                    active={location.pathname.includes('/create')}
                    onClick={() => handleTabClick("create")}
                />
            </Tabs>
            <div className="card-body">
                <Routes>
                    <Route path="/" element={<ImportRoot />} />
                    <Route path="/create" element={<CreateRoot />} />
                </Routes>
            </div>
        </div>
    );
};

export default ImportCreateRoot;
