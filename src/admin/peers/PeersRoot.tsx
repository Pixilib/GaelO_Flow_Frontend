import React, { useState } from 'react';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import NewPeerCard from './NewPeerCard';
import PeersTable from './PeersTable';
import Toast from '../../ui/toast/Toast';
import { updatePeer, deletePeer, getPeers } from '../../services/peers'; 
import { useCustomQuery, useCustomMutation } from '../../utils/reactQuery';
import { Colors } from '../../utils/enums';
import Spinner from '../../ui/Spinner';

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
}

const PeersRoot: React.FC = () => {
    const [showNewPeerCard, setShowNewPeerCard] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'danger'>('success');
    
    const { data: peers, isLoading } = useCustomQuery<PeerData[]>(['peers'], getPeers, {
        select: (data) => Object.values(data).map((item: any) => ({
            username: item.username,
            peername: item.peername,
            url: item.url,
        })),
    });

    const { mutate: updatePeerMutate } = useCustomMutation(
        (peer: PeerData) => updatePeer(peer),
        {
            onSuccess: () => showSuccessToast("Peer updated successfully."),
            onError: () => showErrorToast("An error occurred while updating the peer."),
        }
    );

    const { mutate: deletePeerMutate } = useCustomMutation(
        (peerName: string) => deletePeer(peerName),
        {
            onSuccess: () => showSuccessToast("Peer deleted successfully."),
            onError: () => showErrorToast("An error occurred while deleting the peer."),
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

    const handleNewPeerClick = () => setShowNewPeerCard(true);

    const createPeerHandler = (peer: PeerData) => {
        updatePeerMutate(peer);
    };

    const deletePeerHandler = (peerName: string) => {
        if (window.confirm(`Are you sure you want to delete the peer named "${peerName}"?`)) {
            deletePeerMutate(peerName);
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <Card>
            <CardHeader title="Peers" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <PeersTable peerData={peers ?? []} onDeletePeer={deletePeerHandler} onEditPeer={(peer: PeerData) => updatePeerMutate(peer)} />
                    </div>
                    <Button color={Colors.success} onClick={handleNewPeerClick}>
                        <MoreIcon className="mr-3" size={24} /> Create New Peer
                    </Button>
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewPeerCard && (
                    <NewPeerCard onClose={() => setShowNewPeerCard(false)} onCreatePeer={createPeerHandler} />
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
