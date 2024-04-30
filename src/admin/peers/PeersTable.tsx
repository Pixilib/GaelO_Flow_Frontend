import React from 'react';
import {Table, Badge} from '../../ui';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../utils/enums';
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { Peer } from '../../utils/types';

interface PeersTableProps {
    peerData: Peer[];
    onDeletePeer: (peerName: string) => void;
    onEditPeer: (peer: Peer) => void;
}

const PeersTable: React.FC<PeersTableProps> = ({ peerData, onDeletePeer, onEditPeer }) => {
    const columns: ColumnDef<Peer>[] = [
        { accessorKey: 'username', header: 'Username' },
        { accessorKey: 'name', header: 'Peer Name', cell: info => <Badge value={info.getValue() as string} /> },
        { accessorKey: 'url', header: 'URL' },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <>
                    <div className="action-icons">
                    <EditIcon onClick={() => onEditPeer(row.original)} className="icon edit-icon" />
                    <DeleteIcon onClick={() => onDeletePeer(row.original.name)} className="icon delete-icon" />
                </div>
                </>
            )
        }
    ];

    return <Table columns={columns} data={peerData} headerColor={Colors.almond} />;
};

export default PeersTable;
