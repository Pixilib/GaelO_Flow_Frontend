import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, Tab, Card, CardBody, CardFooter, Button } from "../ui";
import { Colors } from "../utils";
import CreateRoot from "./Create/CreateRoot";
import ImportRoot from "./Import/ImportRoot";

const ImportCreateRoot = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;

    const [isCreatingDicom, setIsCreatingDicom] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    const handleTabClick = (tab: string) => {
        setIsCreatingDicom(tab === "create");
        setShowCreateForm(false); // Assurez-vous que le formulaire est fermé lors du changement d'onglet
        navigate(tab);
    };

    const handleCreateDicomClick = () => {
        setShowCreateForm(true);
    };

    const handleCloseForm = () => {
        setShowCreateForm(false);
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
                    <CreateForm onClose={handleCloseForm} />
                </CardFooter>
            )}
        </Card>
    );
};

export default ImportCreateRoot;
