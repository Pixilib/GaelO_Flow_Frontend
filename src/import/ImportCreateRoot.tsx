import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Tabs, Tab, Card, CardBody } from "../ui";
import { Colors } from "../utils";
import CreateRoot from "./Create/CreateRoot";
import ImportRoot from "./Import/ImportRoot";

const ImportCreateRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }

    return (
        <Card className="bg-white shadow-md rounded-xl" data-gaelo-flow="import-create-root">
            <Tabs className="bg-primary rounded-t-xl">
                <Tab
                    title="Import Dicom"
                    active={path.endsWith("import")}
                    onClick={() => handleTabClick("")}
                />
                <Tab
                    title="Create Dicom"
                    active={path.endsWith("create")}
                    onClick={() => handleTabClick("create")}
                />
            </Tabs>
            <CardBody
                color={Colors.light}
                roundedTopLeft={false}
                roundedTopRight={false}
                roundedBottomLeft
                roundedBottomRight
            >
                <Routes>
                    <Route path="/" element={<ImportRoot />} />
                    <Route path="/create" element={<CreateRoot />} />
                </Routes>
            </CardBody>
        </Card>
    );
}

export default ImportCreateRoot;
