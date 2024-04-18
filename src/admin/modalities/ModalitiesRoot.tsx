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
    const { data: aets, isLoading } = useCustomQuery<AetData[]>('modalities', getModalities);

    const { mutate: updateModalityMutate } = useCustomMutation(
        (aet: AetData) => updateModality(aet),
        {
            onSuccess: () => console.log("Modality updated successfully."),
            onError: () => console.log("Error updating modality.")
        }
    );

    const { mutate: deleteModalityMutate } = useCustomMutation(
        (name: string) => deleteModality(name),
        {
            onSuccess: () => console.log("Modality deleted successfully."),
            onError: () => console.log("Error deleting modality.")
        }
    );

    const handleNewAetClick = () => setShowNewAetCard(true);
    const handleCloseNewAetCard = () => setShowNewAetCard(false);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardHeader title="Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable aetData={aets || []} onDeleteAet={(aetName: string) => deleteModalityMutate(aetName)} onEditAet={function (_aet: AetData): void {
                            throw new Error('Function not implemented.');
                        } } />
                    </div>
                    {!showNewAetCard && (
                        <Button color={Colors.success} onClick={handleNewAetClick}>
                            <MoreIcon className="mr-3" size={24} /> New modality
                        </Button>
                    )}
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewAetCard && (
                    <NewModalityCard onClose={handleCloseNewAetCard} onCreateAet={(aet: AetData) => updateModalityMutate(aet)} />
                )}
            </CardFooter>
        </Card>
    );
};

export default ModalitiesRoot;
