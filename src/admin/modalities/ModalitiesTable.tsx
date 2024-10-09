import React from "react";

import { ColumnDef } from "@tanstack/react-table";

import { Table, Badge, Button } from "../../ui";
import { Colors } from "../../utils/enums";
import { Modality } from "../../utils/types";
import { Trash, Wifi } from "../../icons";

interface ModalitiesTableProps {
  aetData?: Modality[];
  onDeleteAet: (aetName: string) => void;
  onEchoAet: (aetName: string) => void;
}

const ModalitiesTable: React.FC<ModalitiesTableProps> = ({
  aetData = [],
  onDeleteAet,
  onEchoAet,
}) => {
  
  const columns: ColumnDef<Modality>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "aet",
      header: "AET",
      cell: (info) => <Badge value={info.getValue() as string} />,
    },
    {
      accessorKey: "host",
      header: "Host",
    },
    {
      accessorKey: "manufacturer",
      header: "Manufacturer",
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-center items-center gap-2.5">
          <Button
            onClick={() => onEchoAet(row.original.name)}
            color={Colors.secondary}
          >
            <Wifi />
          </Button>
          <Button
            onClick={() => onDeleteAet(row.original.name)}
            color={Colors.danger}
          >
            <Trash size={18} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={aetData}
      headerColor={Colors.white} 
      headerTextSize="xs"  
      className="bg-gray-100"
      enableColumnFilters
      enableSorting
    />
  );
};

export default ModalitiesTable;
