import React, { useState } from 'react';
import { AiOutlinePlus as MoreIcon } from 'react-icons/ai';
import Card, { CardHeader, CardBody, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import NewPeerCard from './NewPeerCard';
import PeersTable from './PeersTable';
import { Toast } from '../../ui';
import { createPeer, updatePeer, deletePeer, getPeers } from '../../services/peers';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { Colors } from '../../utils/enums';
import Spinner from '../../ui/Spinner';

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
}

const PeersRoot = () => {
    const [showNewPeerCard, setShowNewPeerCard] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const queryClient = useQueryClient();

    const { data: peers, isLoading } = useQuery<PeerData[]>('peers', getPeers);

    const updatePeerMutation = useMutation(updatePeer, {
        onSuccess: () => {
            showSuccessToast("Peer updated successfully.");
            queryClient.invalidateQueries('peers');
        },
        onError: () => {
            showErrorToast("An error occurred while updating the peer.");
        }
    });

    const deletePeerMutation = useMutation(deletePeer, {
        onSuccess: () => {
            showSuccessToast("Peer deleted successfully.");
            queryClient.invalidateQueries('peers');
        },
        onError: () => {
            showErrorToast("An error occurred while deleting the peer.");
        }
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

    const handleCreateNewPeer = (peer: PeerData) => {
        createPeer(peer).then(() => {
            showSuccessToast("Peer created successfully.");
            queryClient.invalidateQueries('peers');
        }).catch(() => {
            showErrorToast("An error occurred while creating the peer.");
        });
    };

    if (isLoading) return <Spinner />;

    return (
        <Card>
            <CardHeader title="Peers" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-8">
                        <PeersTable
                            peerData={peers ?? []}
                            onDeletePeer={(peerName) => deletePeerMutation.mutate(peerName)}
                            onEditPeer={(peer) => updatePeerMutation.mutate(peer)}
                       
                       />
                    </div>
                    <Button color={Colors.success} onClick={() => setShowNewPeerCard(true)}>
                        <MoreIcon className="mr-3" size={24} /> Create New Peer
                    </Button>
                </div>
            </CardBody>
            <CardFooter color={Colors.light}>
                {showNewPeerCard && (
                    <NewPeerCard onClose={() => setShowNewPeerCard(false)} onCreatePeer={handleCreateNewPeer} />
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
