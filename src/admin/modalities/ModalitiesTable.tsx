import React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { VscTrash as DeleteIcon } from "react-icons/vsc";
import { AiOutlineAudio as EchoIcon } from "react-icons/ai"; 

import { Table, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';
import { Modality } from '../../utils/types';

interface ModalitiesTableProps {
    aetData?: Modality[];
    onDeleteAet: (aetName: string) => void;
    onEchoAet: (aetName :string) => void;
}

const ModalitiesTable: React.FC<ModalitiesTableProps> = ({ aetData = [], onDeleteAet, onEchoAet }) => {
    const columns: ColumnDef<Modality>[] = [
        {
            accessorKey: 'name',
            header: 'Name'
        },
        {
            accessorKey: 'aet',
            header: 'AET',
            cell: info => <Badge value={info.getValue() as string} />
        },
        {
            accessorKey: 'host',
            header: 'Host'
        },
        {
            accessorKey: 'manufacturer',
            header: 'Manufacturer'
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <Button onClick={() => onEchoAet(row.original.name)} color={Colors.secondary}>
                    <EchoIcon />
                </Button>
            )
        },
        {
            id: 'delete',
            cell: ({ row }) => (
                <DeleteIcon
                    onClick={() => onDeleteAet(row.original.name)}
                    className="text-black cursor-pointer"
                />),
        }
    ];

    return <Table columns={columns} data={aetData} headerColor={Colors.almond} enableColumnFilters enableSorting />;
};

export default ModalitiesTable;
