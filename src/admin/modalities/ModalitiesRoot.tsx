import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import NewModalityCard from './NewModalityCard';
import ModalitiesTable from './ModalitiesTable';
import Toast from '../../ui/toast/Toast';
import { updateModality, deleteModality, getModalities } from '../../services/modalities';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { Colors } from '../../utils/enums';

interface AetData {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

const ModalitiesRoot: React.FC = () => {
    const [showNewAetCard, setShowNewAetCard] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'danger'>('success');

    const { data: aets, isLoading, error } = useCustomQuery<AetData[]>(
        'modalities',
        getModalities,
        {
            select: (response: { data: any[]; }) => response.data.map((item) => ({
                name: item.name,
                aet: item.aet,
                host: item.host,
                port: item.port,
                manufacturer: item.manufacturer,
            })),
        }
    );

    const updateModalityMutation = useCustomMutation(
        ({ name, aet, host, port, manufacturer }) => updateModality(name, aet, host, port, manufacturer),
        [['modalities']]
    );

    const deleteModalityMutation = useCustomMutation(
        ({ name }) => deleteModality(name),
        [['modalities']]
    );

    // Functions for toast notifications
    const showSuccessToast = (message: string) => {
        setToastMessage(message);
        setToastType('success');
        setShowToast(true);
    };

    const showErrorToast = (message: string) => {
        setToastMessage(message);
        setToastType('danger');
        setShowToast(true);
    };

    // Handlers for modalities management
    const handleNewAetClick = () => setShowNewAetCard(true);

    const createAetHandler = (aet: AetData) => {
        updateModalityMutation.mutate(aet, {
            onSuccess: () => showSuccessToast("Modality created successfully."),
            onError: (error) => {
                console.error("Error", error);
                showErrorToast("An error occurred while creating the modality.");
            }
        });
    };

    const deleteAetHandler = (aetName: string) => {
        if (window.confirm(`Are you sure you want to delete the modality named "${aetName}"?`)) {
            deleteModalityMutation.mutate({ name: aetName }, {
                onSuccess: () => showSuccessToast("Modality deleted successfully."),
                onError: (error) => {
                    console.error("Error deleting modality: ", error);
                    showErrorToast("An error occurred while deleting the modality.");
                }
            });
        }
    };

    return (
        <Card>
            <CardHeader title="Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                {isLoading ? (
                    <div>Loading modalities...</div>
                ) : error ? (
                    <div>Error fetching modalities: {error.toString()}</div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-full mb-8">
                            <ModalitiesTable data={aets} onDeleteAet={deleteAetHandler} />
                        </div>
                        <Button color={Colors.success} onClick={handleNewAetClick}>
                            <MoreIcon className="mr-2" size={24} /> New modality
                        </Button>
                    </div>
                )}
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewAetCard && (
                    <NewModalityCard onClose={() => setShowNewAetCard(false)} onCreateAet={createAetHandler} />
                )}
            </CardFooter>
            {showToast && (
                <Toast
                    content={toastMessage}
                    type={toastType}
                    onClose={() => setShowToast(false)}
                    animation="slide-left"
                    position="bottom-left"
                />
            )}
        </Card>
    );
};

export default ModalitiesRoot;