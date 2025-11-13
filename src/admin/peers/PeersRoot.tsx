import React, { useState } from "react";

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
import { More } from "../../icons";
import { useTranslation } from "react-i18next";
import PeersTour from "../../tour/tours/admin/PeersTour";

const PeersRoot: React.FC = () => {
  const { toastSuccess, toastError } = useCustomToast();
  const [showNewPeerCard, setShowNewPeerCard] = useState(false);
  const {t} = useTranslation()

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
      <div className="w-full flex justify-end m-1">
          <PeersTour />
      </div>
      <CardHeader
        centerTitle
        color={Colors.primary}
        title={t("admin.peers.manage-peers")}
      />
      <CardBody className="space-x-4 bg-almond dark:bg-neutral-500">
        <div data-gaelo-flow="peers-datatable" className="flex flex-col items-center">
          <div className="w-full mt-2 mb-2">
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
      <CardFooter className="flex justify-center py-4 border-t-2 shadow-inner border-slate-200 dark:border-neutral-700 dark:bg-slate-950 bg-light">
        {!showNewPeerCard && (
          <Button data-gaelo-flow="peers-button-new-peers" color={Colors.success} onClick={handleNewPeerClick}>
            <More className="mr-3" size={24} /> {t("admin.peers.new-peer")}
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
