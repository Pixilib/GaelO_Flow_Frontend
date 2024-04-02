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

interface PeerData {
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

    const { data: Peers, isLoading } = useCustomQuery<PeersData[]>(
        'Peers',
        () => getPeers(),
        {
            select: (data: object) => Object.entries(data).map(([key, item]) => ({
                name: key,
                aet: item.Aet,
                host: item.Host,
                port: item.Port,
                manufacturer: item.Manufacturer,
            })),
        }
    );

    console.log(peers)

    const updatePeerMutation = useCustomMutation(
        ({ name, aet, host, port, manufacturer }) => updatePeer(name, aet, host, port, manufacturer),
        [['Peers']]
    );

    const deleteModalityMutation = useCustomMutation(
        ({ name }) => deleteModality(name),
        [['peers']]
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

    const createPeerHandler = (aet: PeerData) => {
        updateMPeerMutation.mutate(Peer, {
            onSuccess: () => showSuccessToast("Modality created successfully."),
            onError: (error) => {
                console.error("Error", error);
                showErrorToast("An error occurred while creating the modality.");
            }
        });
    };

    const deletePeerHandler = (aetName: string) => {
        if (window.confirm(`Are you sure you want to delete the modality named "${peerName}"?`)) {
            deleteModalityMutation.mutate({ name: peerName }, {
                onSuccess: () => showSuccessToast("Modality deleted successfully."),
                onError: (error) => {
                    console.error("Error deleting modality: ", error);
                    showErrorToast("An error occurred while deleting the modality.");
                }
            });
        }
    };

    if(isLoading) {
        return <Spinner/>
    } 

    return (
        <Card>
            <CardHeader title="Modalities" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <ModalitiesTable peerData={peers} onDeletePeer={deletePeerHandler} />
                    </div>
                    <Button color={Colors.success} onClick={handleNewPeerClick}>
                        <MoreIcon className="mr-3" size={24} /> New modality
                    </Button>
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewPeerCard && (
                    <NewPeerCard onClose={() => setShowNewAetCard(false)} onCreateAet={createPeerHandler} />
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

export default PeersRoot;