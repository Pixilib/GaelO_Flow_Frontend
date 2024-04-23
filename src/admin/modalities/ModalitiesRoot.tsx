import React, { useState } from 'react';

import { AiOutlinePlus as MoreIcon } from "react-icons/ai";

import { Button, Card, CardHeader, CardBody, CardFooter, Spinner } from '../../ui';
import { Colors } from '../../utils/enums';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';

import NewModalityCard from './NewModalityCard';
import ModalitiesTable from './ModalitiesTable';
import { updateModality, deleteModality, getModalities, echoModality } from '../../services/modalities';
import { useCustomToast } from '../../utils/toastify';

interface AetData {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

const ModalitiesRoot: React.FC = () => {

    const { toastSuccess, toastError } = useCustomToast()

    const [showNewAetCard, setShowNewAetCard] = useState(false);

    const { data: aets, isLoading } = useCustomQuery<AetData[]>(
        ['modalities'],
        () => getModalities(),
        {
            select: (data): AetData[] => {
                return Object.entries(data).map(([name, aet]) => {
                    return {
                        name: name,
                        aet: aet.AET,
                        host: aet.Host,
                        port: aet.Port,
                        manufacturer: aet.Manufacturer
                    }
                });
            }
        });

    const { mutate: updateModalityMutate } = useCustomMutation(
        (aet: AetData) => updateModality({ AET: aet.aet, Host: aet.host, Port: aet.port, Manufacturer: aet.manufacturer, Name: aet.name }),
        [['modalities']],
        {
            onSuccess: () => toastSuccess("Modality created successfully"),
            onError: () => toastError("Error while creating modality"),
        }
    );

    const { mutate: echoModalityMutate } = useCustomMutation(
        (aetName :string) => echoModality(aetName),
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
    const handleEchoAet = (aetName :string) => echoModalityMutate(aetName);

    if (isLoading) return <Spinner />;

    return (
        <Card>
            <CardHeader title="Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable aetData={aets} onDeleteAet={(aetName: string) => deleteModalityMutate(aetName)} onEchoAet={handleEchoAet} />
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
