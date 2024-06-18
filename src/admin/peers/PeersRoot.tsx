import React, { useState } from "react";

import { AiOutlinePlus as MoreIcon } from "react-icons/ai";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
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
      <CardBody color={Colors.light} roundedTopLeft roundedTopRight>
                <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Manage Peers</h2>
        <div className="flex flex-col items-center">
          <div className="w-full mb-8">
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
          {!showNewPeerCard && (
            <Button color={Colors.success} onClick={handleNewPeerClick}>
              <MoreIcon className="mr-3" size={24} /> New Peer
            </Button>
          )}
        </div>
      </CardBody>
      <CardFooter color={Colors.light}>
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
