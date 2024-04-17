import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import NewPeerCard from './NewPeerCard'; // Assurez-vous que cet import correspond à votre nom de fichier et de composant
import PeersTable from './PeersTable';
import Toast from '../../ui/toast/Toast';
import { updatePeer, deletePeer, getPeers } from '../../services/peers';
import { useCustomMutation, useCustomQuery } from '../../utils/reactQuery';
import { Colors } from '../../utils/enums';
import Spinner from '../../ui/Spinner';

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
    port: number;
    ipAddress: string;
    password: string;
}

const PeersRoot: React.FC = () => {
    const [showNewPeerCard, setShowNewPeerCard] = useState(false);
    const { data: peers, isLoading } = useCustomQuery<PeerData[]>('peers', getPeers);

    const { mutate: updatePeerMutate } = useCustomMutation((peer: PeerData) => updatePeer(peer), {
        onSuccess: () => console.log("Peer updated successfully."),
        onError: () => console.log("Error updating peer.")
    });

    const { mutate: deletePeerMutate } = useCustomMutation((peerName: string) => deletePeer(peerName), {
        onSuccess: () => console.log("Peer deleted successfully."),
        onError: () => console.log("Error deleting peer.")
    });

    const handleNewPeerClick = () => setShowNewPeerCard(true);
    const handleCloseNewPeerCard = () => setShowNewPeerCard(false);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardHeader title="Peers" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <PeersTable peerData={peers || []} onDeletePeer={(peerName: string) => deletePeerMutate(peerName)} />
                    </div>
                    {!showNewPeerCard && (
                        <Button color={Colors.success} onClick={handleNewPeerClick}>
                            <MoreIcon className="mr-3" size={24} /> New Peer
                        </Button>
                    )}
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewPeerCard && (
                    <NewPeerCard onClose={handleCloseNewPeerCard} onCreatePeer={(peer: PeerData) => updatePeerMutate(peer)} />
                )}
            </CardFooter>
        </Card>
    );
};

export default PeersRoot;

