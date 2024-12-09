import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Table, Badge, Button } from '../../ui';
import { Colors } from '../../utils/enums';
import { Peer } from '../../utils/types';
import { Trash, Wifi } from '../../icons';

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
                <div className="flex justify-start items-center gap-2.5"> {/* Alignement à gauche */}
                    <Button onClick={() => onEchoPeer(row.original.name)} color={Colors.secondary}>
                        <Wifi />
                    </Button>
                    <Button onClick={() => onDeletePeer(row.original.name)} color={Colors.danger}>
                        <Trash size={18} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <Table
            columns={columns}
            data={peerData}
            headerTextSize='xs'
            headerColor={Colors.white}
            className="bg-gray-100"
        />
    );
};

export default PeersTable;
