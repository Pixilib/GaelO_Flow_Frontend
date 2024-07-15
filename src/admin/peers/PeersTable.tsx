import React from 'react';

import { ColumnDef } from '@tanstack/react-table';
import { BiTrash as DeleteIcon, BiWifi as EchoIcon } from "react-icons/bi";

import { Table, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';
import { Peer } from '../../utils/types';

interface PeersTableProps {
    peerData: Peer[];
    onDeletePeer: (peerName: string) => void;
    onEchoPeer: (peerName: string) => void;
}

const PeersTable: React.FC<PeersTableProps> = ({ peerData, onDeletePeer, onEchoPeer }) => {
    const columns: ColumnDef<Peer>[] = [
        {
            accessorKey: 'username',
            header: 'Username',
        },
        {
            accessorKey: 'name',
            header: 'Peer Name',
            cell: info => <Badge value={info.getValue() as string} />
        },
        {
            accessorKey: 'url',
            header: 'URL',
        },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <div className="flex justify-center items-center gap-2.5">
                    <Button onClick={() => onEchoPeer(row.original.name)} color={Colors.secondary}>
                        <EchoIcon />
                    </Button>
                    <Button onClick={() => onDeletePeer(row.original.name)} color={Colors.danger}>
                        <DeleteIcon size={18} />
                    </Button>
                </div>
            )
        }
    ];

    return <Table
        columns={columns}
        data={peerData}
        headerTextSize='xs'
        headerColor={Colors.white}
        className="bg-gray-100"

    />;
};

export default PeersTable;
