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
        <Card className="mx-12 mt-12 shadow-md rounded-xl" data-gaelo-flow="users-root">
            <CardBody color={Colors.light} roundedTopLeft roundedTopRight roundedBottomLeft roundedBottomRight>
            <Tabs className=" bg-light-gray">
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
            
            <Routes>
                <Route path="/" element={<ImportDrop/>} />
                <Route path="/create" element={<CreateDrop />} /> 
            </Routes>
            </CardBody>
            </Card>
    );
}


export default ImportCreateRoot;
