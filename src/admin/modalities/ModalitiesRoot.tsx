import React, { useState } from 'react';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";

import { Button, Card, CardBody, CardFooter, Spinner } from '../../ui';
import { Colors } from '../../utils/enums';
import { Modality, ModalityExtended } from '../../utils/types';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { useCustomToast } from '../../utils/toastify';

import NewModalityCard from './NewModalityCard';
import ModalitiesTable from './ModalitiesTable';
import { updateModality, deleteModality, getModalities, echoModality } from '../../services/modalities';


const ModalitiesRoot: React.FC = () => {

    const { toastSuccess, toastError } = useCustomToast()

    const [showNewAetCard, setShowNewAetCard] = useState(false);

    const { data: aets, isLoading } = useCustomQuery<ModalityExtended[], Modality[]>(
        ['modalities'],
        () => getModalities(),
        {
            select: (response) =>
                Object.entries(response).map(([name, aet]) => ({
                    name: name,
                    aet: aet.AET,
                    host: aet.Host,
                    port: aet.Port,
                    manufacturer: aet.Manufacturer,
                })),
        }
    );

    const { mutate: updateModalityMutate } = useCustomMutation(
        (aet: Modality) => updateModality(aet),
        [['modalities']],
        {
            onSuccess: () => toastSuccess("Modality created successfully"),
            onError: () => toastError("Error while creating modality"),
        }
    );

    const { mutate: echoModalityMutate } = useCustomMutation(
        (aetName: string) => echoModality(aetName),
        [['modalities']],
        {
            onSuccess: () => toastSuccess("Echo successful"),
            onError: () => toastError("Error while echo"),
        }
    );

    const { mutate: deleteModalityMutate } = useCustomMutation(
        (name: string) => deleteModality(name),
        [['modalities']],
        {
            onSuccess: () => toastSuccess("Modality deleted successfully"),
            onError: () => toastError("Error while deleting modality"),
        }
    );

    const handleNewAetClick = () => setShowNewAetCard(true);
    const handleCloseNewAetCard = () => setShowNewAetCard(false);
    const handleEchoAet = (aetName: string) => echoModalityMutate(aetName);

    if (isLoading) return <Spinner />;

    return (
        <Card>
            <CardBody color={Colors.light} roundedTopLeft roundedTopRight>
                <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Manage Modalities</h2>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable
                            aetData={aets}
                            onDeleteAet={(aetName: string) => deleteModalityMutate(aetName)}
                            onEchoAet={handleEchoAet} />
                    </div>


                </div>
            </CardBody>
            <CardFooter className="border-t-2 border-ligth" color={Colors.light}>

                {!showNewAetCard && (
                    <Button
                        color={Colors.success}
                        onClick={handleNewAetClick}>
                        <MoreIcon className="mr-3 " size={24} /> New modality
                    </Button>
                )}

                {showNewAetCard && (
                    <NewModalityCard
                        onClose={handleCloseNewAetCard}
                        onCreateAet={(aet: Modality) => updateModalityMutate(aet)}
                    />
                )}
            </CardFooter>
        </Card>
    );
};

export default ModalitiesRoot;
