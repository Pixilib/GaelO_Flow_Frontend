import React, { useState } from "react";

import { AiOutlinePlus as MoreIcon } from "react-icons/ai";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";

import NewPeerCard from "./NewPeerCard";
import PeersTable from "./PeersTable";
import {
  updatePeer,
  deletePeer,
  getPeers,
  echoPeer,
} from "../../services/peers";
import { useCustomToast } from "../../utils/toastify";
import { Peer } from "../../utils/types";

const PeersRoot: React.FC = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const [showNewPeerCard, setShowNewPeerCard] = useState(false);

  const { data: peers, isLoading } = useCustomQuery<Peer[]>(["peers"], () =>
    getPeers()
  );

  const echoPeerMutation = useCustomMutation(({ name }) => echoPeer(name), [], {
    onSuccess: () => toastSuccess("Peer echoed successfully"),
    onError: () => toastError("Error while echo peer"),
  });

  const updatePeerMutate = useCustomMutation(
    (peer: Peer) =>
      updatePeer(peer.name, peer.url, peer.username, peer.password),
    [["peers"]],
    {
      onSuccess: () => toastSuccess("Peer updated successfully"),
      onError: () => toastError("Error while updating peer"),
    }
  );

  const deletePeerMutate = useCustomMutation(
    ({ name }) => deletePeer(name),
    [["peers"]],
    {
      onSuccess: () => toastSuccess("Peer deleted successfully"),
      onError: (error: any) =>
        toastError(`Error while deleting peer: ${error?.message}`),
    }
  );

  const handleNewPeerClick = () => setShowNewPeerCard(true);
  const handleCloseNewPeerCard = () => setShowNewPeerCard(false);

  if (isLoading) return <Spinner />;

  return (
    <Card>
            <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={'Manage Peers'}
            />
            <CardBody className="space-x-4 bg-almond">
            <div className="flex flex-col items-center">
          <div className="w-full mt-6 mb-8">
            <PeersTable
              peerData={peers || []}
              onDeletePeer={(peerName) =>
                deletePeerMutate.mutate({ name: peerName })
              }
              onEchoPeer={(peerName) =>
                echoPeerMutation.mutate({ name: peerName })
              }
            />
          </div>
          
        </div>
      </CardBody>
      <CardFooter className="flex justify-center border-t-2 shadow-inner border-indigo- bg-light">
      {!showNewPeerCard && (
            <Button color={Colors.success} onClick={handleNewPeerClick}>
              <MoreIcon className="mr-3" size={24} /> New Peer
            </Button>
          )}
        {showNewPeerCard && (
          <NewPeerCard
            onClose={handleCloseNewPeerCard}
            onCreatePeer={updatePeerMutate.mutate}
          />
        )}
      </CardFooter>
    </Card>
  );
};

export default PeersRoot;
