import React, { ChangeEvent, useState } from "react";

import { AiOutlineCheck as CheckIcon } from "react-icons/ai";
import { FormCard, Button, Input, SelectInput } from "../../ui";
import { Colors } from "../../utils/enums";

import { useCustomToast } from "../../utils/toastify";
import { Modality, Option } from "../../utils/types";

interface NewModalityCardProps {
  onClose: () => void;
  onCreateAet: (aet: Modality) => void;
}

const NewModalityCard: React.FC<NewModalityCardProps> = ({
  onClose,
  onCreateAet,
}) => {
  const { toastWarning } = useCustomToast();
  const [name, setName] = useState("");
  const [aet, setAet] = useState("");
  const [host, setHost] = useState("");
  const [port, setPort] = useState<number | "">("");
  const [manufacturer, setManufacturer] = useState<Option | null>(null);

  const options = [
    { value: "Generic", label: "Generic" },
    { value: "GenericNoWildcardInDates", label: "GenericNoWildcardInDates" },
    {
      value: "GenericNoUniversalWildcard",
      label: "GenericNoUniversalWildcard",
    },
    { value: "Vitrea", label: "Vitrea" },
    { value: "GE", label: "GE" },
  ];

  const isValidPort = (port: number) => port > 0 && port <= 65535;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      toastWarning("Name is required.");
      return;
    }
    if (!aet.trim()) {
      toastWarning("AET is required.");
      return;
    }
    if (!host.trim()) {
      toastWarning("Host is required.");
      return;
    }
    if (port === "") {
      toastWarning("Port is required.");
      return;
    }
    if (isNaN(Number(port))) {
      toastWarning("Port must be a number.");
      return;
    }
    if (!isValidPort(Number(port))) {
      toastWarning("Port must be between 1 and 65535.");
      return;
    }
    if (!manufacturer) {
      toastWarning("Manufacturer is required.");
      return;
    }

    const newAetData: Modality = {
      name,
      aet,
      host,
      port: Number(port),
      manufacturer: manufacturer.value,
    };
    onCreateAet(newAetData);
  };

  const handleSelectChange = (option: Option|null) => {
    setManufacturer(option);
  };

  return (
    <FormCard
      className="bg-light-gray"
      title="Create New Modality"
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-2 gap-4 p-4">
        <Input
          label="Name"
          bordered = {false}
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          aria-label="Modality Name"
        />
        <Input
          label="AET"
          bordered
          value={aet}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAet(e.target.value)}
          aria-label="AET"
        />
        <Input
          label="Host"
          bordered
          value={host}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setHost(e.target.value)}
          aria-label="Host"
        />
        <Input
          label="Port"
          bordered
          type="number"
          value={port.toString()}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPort(e.target.value === "" ? "" : Number(e.target.value))
          }
          aria-label="Port"
        />
        <div className="col-span-2">
          <SelectInput
            options={options}
            value={manufacturer?.value ?? null}
            onChange={handleSelectChange}
            placeholder="Select Manufacturer"
            aria-label="Manufacturer"
          />
        </div>
      </div>
      <div className="flex justify-center">
      <Button type="submit" color={Colors.success} aria-label="Submit New Modality">
          <CheckIcon size="20px" />
        </Button>
      </div>

    </FormCard>
  );
};

export default NewModalityCard;
