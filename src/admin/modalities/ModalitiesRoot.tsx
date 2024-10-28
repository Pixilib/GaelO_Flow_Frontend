import React, { useState } from "react";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
} from "../../ui";
import { Colors } from "../../utils/enums";
import { Modality, ModalityExtended } from "../../utils/types";
import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { useCustomToast } from "../../utils/toastify";

import NewModalityCard from "./NewModalityCard";
import ModalitiesTable from "./ModalitiesTable";
import {
  updateModality,
  deleteModality,
  getModalities,
  echoModality,
} from "../../services/modalities";
import { More } from "../../icons";

const ModalitiesRoot: React.FC = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const [showNewAetCard, setShowNewAetCard] = useState(false);

  const { data: aets, isLoading } = useCustomQuery<
    ModalityExtended[],
    Modality[]
  >(["modalities"], () => getModalities(), {
    select: (response) => {
      return response.map((modality) => ({
        name: modality.name,
        aet: modality.aet,
        host: modality.host,
        port: modality.port,
        manufacturer: modality.manufacturer,
      }));
    },
  });

  const { mutate: updateModalityMutate } = useCustomMutation(
    (aet: Modality) => updateModality(aet),
    [["modalities"]],
    {
      onSuccess: () => toastSuccess("Modality created successfully"),
      onError: () => toastError("Error while creating modality"),
    }
  );

  const { mutate: echoModalityMutate } = useCustomMutation(
    (aetName: string) => echoModality(aetName),
    [["modalities"]],
    {
      onSuccess: () => toastSuccess("Echo successful"),
      onError: () => toastError("Error while echo"),
    }
  );

  const { mutate: deleteModalityMutate } = useCustomMutation(
    (name: string) => deleteModality(name),
    [["modalities"]],
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
      <CardHeader
        centerTitle
        color={Colors.primary}
        title={"Manage Modalities"}
      />
      <CardBody color={Colors.almond} className="space-x-4">
        <div className="items-center w-full mt-6 mb-8 f">
          <div className="">
            <ModalitiesTable
              aetData={aets}
              onDeleteAet={(aetName: string) => deleteModalityMutate(aetName)}
              onEchoAet={handleEchoAet}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter color={Colors.light} className="flex justify-center border-t-2 shadow-inner border-slate-200 bg-light">
        {!showNewAetCard && (
          <Button color={Colors.success} onClick={handleNewAetClick}>
            <More className="mr-3 "
              size={24} />
            New modality
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
