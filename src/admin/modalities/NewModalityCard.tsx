import React, { ChangeEvent, useState } from "react";

import { CgClose as CloseIcon } from "react-icons/cg";
import { AiOutlineCheck as CheckIcon } from "react-icons/ai";

import {
  Card,
  Button,
  Input,
  SelectInput,
  CardHeader,
  CardBody,
  CardFooter,
} from "../../ui";
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

  const handleSelectChange = (option: Option) => {
    setManufacturer(option);
  };

  const isValidPort = (port: number) => port > 0 && port <= 65535;

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
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

  return (
    <Card className="flex flex-col h-full">
      <CardHeader title="Create New Modality" color={Colors.success}>
        <CloseIcon
          size="24px"
          title="Close"
          onClick={onClose}
          className="ml-auto mr-[8px] cursor-pointer"
        />
      </CardHeader>
      <CardBody className="p-4 bg-stone-100">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <Input
            label="Name"
            bordered
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            aria-label="Modality Name"
          />
          <Input
            label="AET"
            bordered
            value={aet}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setAet(e.target.value)
            }
            aria-label="AET"
          />
          <Input
            label="Host"
            bordered
            value={host}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setHost(e.target.value)
            }
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
              value={manufacturer ?? undefined}
              onChange={handleSelectChange}
              placeholder="Select Manufacturer"
              aria-label="Manufacturer"
            />
          </div>
          <CardFooter className="flex justify-center col-span-2 bg-stone-100">
            <Button
              type="submit"
              color={Colors.success}
              aria-label="Submit New Modality"
            >
              <CheckIcon size="20px" />
            </Button>
          </CardFooter>
        </form>
      </CardBody>
    </Card>
  );
};

export default NewModalityCard;
