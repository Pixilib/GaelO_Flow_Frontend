import { Route, Routes, useLocation, useNavigate } from "react-router";
import { Tabs, Tab } from "../ui";

import CreateRoot from "./create/CreateRoot";
import ImportRoot from "./import/ImportRoot";
import { useTranslation } from "react-i18next";

const ImportCreateRoot = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {t} = useTranslation()

    const handleTabClick = (tab: string) => {
        navigate('/import/' +tab);
    };

    return (
        <div className="shadow-md bg-almond dark:bg-neutral-500 rounded-xl" data-gaelo-flow="import-create-root">
            <Tabs className="bg-primary rounded-t-xl">
                <Tab
                    title={t("import.Import Dicoms")}
                    active={location.pathname.endsWith('/upload')}
                    onClick={() => handleTabClick("upload")}
                />
                <Tab
                    title={t("import.Create Dicoms")}
                    active={location.pathname.endsWith('/create')}
                    onClick={() => handleTabClick("create")}
                />
            </Tabs>
            <div>
                <Routes>
                    <Route path="/upload" element={<ImportRoot />} />
                    <Route path="/create" element={<CreateRoot />} />
                </Routes>
            </div>
        </div>
    );
};

export default ImportCreateRoot;
