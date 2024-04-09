import React from 'react';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../utils/enums';
import Button from '../../ui/Button';
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon } from 'react-icons/ai';

interface PeerData {
    username: string;
    peername: string;
    url: string;
    isUserCreated?: boolean;
}

interface PeersTableProps {
    peerData: PeerData[];
    onDeletePeer: (peerName: string) => void;
    onEditPeer: (peer: PeerData) => void;
}

const PeersTable: React.FC<PeersTableProps> = ({ peerData, onDeletePeer, onEditPeer }) => {
    const columns: ColumnDef<PeerData>[] = [
        { accessorKey: 'username', header: 'Username' },
        { accessorKey: 'peername', header: 'Peer Name', cell: info => <Badge value={info.getValue() as string} /> },
        { accessorKey: 'url', header: 'URL' },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <>
                    <Button onClick={() => onEditPeer(row.original)} color={Colors.primary}><EditIcon /></Button>
                    <Button onClick={() => onDeletePeer(row.original.peername)} color={Colors.secondary}><DeleteIcon /></Button>
                </>
            )
        }
    ];

    return <Table columns={columns} data={peerData} headerColor={Colors.almond} />;
};

export default PeersTable;
