import { TbWifi} from "react-icons/tb"; 
import React from 'react';

import type { ColumnDef } from '@tanstack/react-table';
import { AiOutlineDelete as DeleteIcon, AiOutlineAudio as EchoIcon } from 'react-icons/ai';

import {Table, Badge, Button} from '../../ui';
import { Colors } from '../../utils/enums';

interface AetData {
    name: string;
    aet: string;
    host: string;
    manufacturer: string;
    isUserCreated?: boolean;
}

interface ModalitiesTableProps {
    aetData?: AetData[];
    onDeleteAet: (aetName: string) => void;
    onEchoAet: (aet: AetData) => void;
}

const ModalitiesTable: React.FC<ModalitiesTableProps> = ({ aetData = [], onDeleteAet, onEchoAet }) => {

    const columns: ColumnDef<AetData>[] = [
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
                    <Button onClick={() => onEchoAet(row.original.name)} color={Colors.secondary}> <TbWifi/> </Button>
            )
        },
        {
            id: 'delete',
            cell: ({ row }) => (
                <DeleteIcon onClick={() => onDeleteAet(row.original.name)} className="text-red-500 cursor-pointer" />
            ),
        }
    ];

    return <Table columns={columns} data={aetData} headerColor={Colors.almond} />;
};

export default ModalitiesTable;
