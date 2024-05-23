import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab } from "../../ui";

import LabelList from "./LabelList";
import CreateLabelForm from "./CreateLabelForm";

const LabelsRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab) => {
        navigate(tab);
    };

    const getTitle = (path) => {
        if (path.startsWith("/labels/list")) {
            return "Label List";
        } else if (path.endsWith("create")) {
            return "Create Label";
        }
        return "Unknown Path";
    };

    return (
        <div className="mx-12 my-12 shadow-md rounded-xl">
            <Tabs className="bg-light-gray">
                <Tab
                    title="Label List"
                    active={path.startsWith("/labels/list")}
                    onClick={() => handleTabClick("/labels/list")}
                />
                <Tab
                    title="Create Label"
                    active={path.endsWith("create")}
                    onClick={() => handleTabClick("/labels/create")}
                />
            </Tabs>
            <Routes>
                <Route
                    path="/"
                    element={<LabelList />}
                />
                <Route
                    path="/create"
                    element={
                        <CreateLabelForm
                            title={getTitle(path)}
                            className="bg-[#EFEFEF]"
                            onClose={() => navigate(-1)}
                        />
                    }
                />
                <Route
                    path="*"
                    element={<LabelList />}
                />
            </Routes>
        </div>
    );
}

export default LabelsRoot;