import React, { useState } from 'react';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import NewModalityCard from './NewModalityCard';
import ModalitiesTable from './ModalitiesTable';
import Toast from '../../ui/toast/Toast';
import { updateModality, deleteModality, getModalities } from '../../services/modalities';
import { useCustomQuery, useCustomMutation } from '../../utils/reactQuery';
import { Colors } from '../../utils/enums';
import Spinner from '../../ui/Spinner';

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
    
    const { data: aets, isLoading } = useCustomQuery<AetData[]>(['modalities'], () => getModalities(), {
        select: (data) => Object.values(data).map((item: any) => ({
            name: item.name,
            aet: item.aet,
            host: item.host,
            port: item.port,
            manufacturer: item.manufacturer,
        })),
    });

    const { mutate: updateModalityMutate } = useCustomMutation(
        (aet: AetData) => updateModality(aet),
        {
            onSuccess: () => showSuccessToast("Modality updated successfully."),
            onError: () => showErrorToast("An error occurred while updating the modality."),
        }
    );

    const { mutate: deleteModalityMutate } = useCustomMutation(
        (name: string) => deleteModality(name),
        {
            onSuccess: () => showSuccessToast("Modality deleted successfully."),
            onError: () => showErrorToast("An error occurred while deleting the modality."),
        }
    );

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

    const handleNewAetClick = () => setShowNewAetCard(true);

    const createAetHandler = (aet: AetData) => {
        updateModalityMutate(aet);
    };

    const deleteAetHandler = (aetName: string) => {
        if (window.confirm(`Are you sure you want to delete the modality named "${aetName}"?`)) {
            deleteModalityMutate(aetName);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <Card>
            <CardHeader title="New Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable aetData={aets ?? []} onDeleteAet={deleteAetHandler} onEditAet={function (_aet: AetData): void {
                            throw new Error('Function not implemented.');
                        } } />
                    </div>
                    <Button color={Colors.success} onClick={handleNewAetClick}>
                        <MoreIcon className="mr-3" size={24} /> Create New modality
                    </Button>
                </div>
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
