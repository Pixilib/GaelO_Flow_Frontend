import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Card, CardBody } from "../ui";
import CreateRoot from "./Create/CreateRoot";
import { Colors } from "../utils";
import ImportRoot from "./Import/ImportRoot";

const ImportCreateRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const handleTabClick = (tab: string) => {
        navigate(tab);
    }

    return (
        <div className="mx-6 my-6">
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
                    <div>
                        <Routes>
                            <Route path="/" element={<ImportRoot />} />
                        </Routes>

                        <Routes>
                            <Route path="/create" element={<CreateRoot />} />
                        </Routes>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ImportCreateRoot;
