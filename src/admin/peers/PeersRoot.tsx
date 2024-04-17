import React, { useState } from 'react';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import NewPeerCard from './NewPeerCard'; // Ensure this import matches your file and component name
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
    isUserCreated?: boolean; // Correct place for optional property
}

const PeersRoot: React.FC = () => {
    const [showNewPeerCard, setShowNewPeerCard] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'danger'>('success');

    const { data: peers, isLoading } = useCustomQuery<PeerData[]>('peers', getPeers, {
        select: (data) => Object.entries(data || {}).map(([key, value]) => ({
            username: key,
            peername: value?.peer ?? '',
            url: value?.url ?? '',
            isUserCreated: value?.isUserCreated // Corrected syntax for object property
        })),
    });

    const { mutate: updatePeerMutate } = useCustomMutation((peer: PeerData) => updatePeer(peer), {
        onSuccess: () => {
            showSuccessToast("Peer updated successfully.");
        },
        onError: () => {
            showErrorToast("An error occurred while updating the peer.");
        },
    });

    const { mutate: deletePeerMutate } = useCustomMutation((peerName: string) => deletePeer(peerName), {
        _onSuccess: () => {
            showSuccessToast("Peer deleted successfully.");
        },
        get onSuccess() {
            return this._onSuccess;
        },
        set onSuccess(value) {
            this._onSuccess = value;
        },
        onError: () => {
            showErrorToast("An error occurred while deleting the peer.");
        },
    });

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

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card>
            <CardHeader title="Peers" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <PeersTable peerData={peers || []} onDeletePeer={deletePeerHandler} onEditPeer={function (_peer: PeerData): void {
                            throw new Error('Function not implemented.');
                        } } />
                    </div>
                    <Button color={Colors.success} onClick={handleNewPeerClick}>
                        <MoreIcon className="mr-3" size={24} /> New Peer
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
