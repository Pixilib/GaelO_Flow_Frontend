import { useState } from "react";
import { Route, Routes, To, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Card, CardBody, CardFooter, Button } from "../ui";
import { Colors } from "../utils";
import CreateRoot from "./Create/CreateRoot";
import ImportRoot from "./Import/ImportRoot";
import CreateForm from "./Create/CreateForm";
import BannerAlert from "../ui/BannerAlert";

const ImportCreateRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [isCreatingDicom, setIsCreatingDicom] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [fileFormatError, setFileFormatError] = useState(false);

    const handleTabClick = (tab: To) => {
        setIsCreatingDicom(tab === "create");
        setShowCreateForm(false);
        navigate(tab);
    };

    const handleCreateDicomClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
    };

    const handleFileUpload = (file: { type: string; }) => {
        if (file.type !== "application/dicom") {
            setFileFormatError(true);
        } else {
            setFileFormatError(false);
        }
    };

    const handleFileChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    return (
        <Card className="shadow-md bg-almond rounded-xl" data-gaelo-flow="import-create-root">
            <Tabs className="bg-primary rounded-t-xl">
                <Tab
                    title="Import Dicom"
                    active={!isCreatingDicom}
                    onClick={() => handleTabClick("")}
                />
                <Tab
                    title="Create Dicom"
                    active={isCreatingDicom}
                    onClick={() => handleTabClick("create")}
                />
            </Tabs>
            <CardBody
                color={Colors.almond}
                roundedTopLeft={false}
                roundedTopRight={false}
                roundedBottomLeft={isCreatingDicom}
                roundedBottomRight={isCreatingDicom}
            >
                <Routes>
                    <Route path="/" element={<ImportRoot />} />
                    <Route path="/create" element={<CreateRoot />} />
                </Routes>
            </CardBody>
            {isCreatingDicom && !showCreateForm && (
                <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                    <Button
                        color={Colors.success}
                        onClick={handleCreateDicomClick}
                    >
                        Create Dicom
                    </Button>
                </CardFooter>
            )}
            {showCreateForm && (
                <CardFooter className="flex justify-center border-t-2 border-indigo-100 shadow-inner bg-light">
                    <CreateForm onClose={handleCloseForm} title={"Create Dicom"} />
                </CardFooter>
            )}
            {fileFormatError && (
                <BannerAlert
                    message="Invalid file format. Please upload a DICOM file."
                />
            )}
            <input type="file" onChange={handleFileChange} accept=".dcm" style={{ display: 'none' }} />
        </Card>
    );
};

export default ImportCreateRoot;
