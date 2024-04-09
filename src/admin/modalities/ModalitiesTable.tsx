import React from 'react';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../utils/enums';
import Button from '../../ui/Button';
import { AiOutlineEdit as EditIcon, AiOutlineDelete as DeleteIcon, AiOutlineRedo as ReplayIcon, AiOutlineAudio as EchoIcon } from 'react-icons/ai';

interface AetData {
    name: string;
    aet: string;
    host: string;
    manufacturer: string;
    isUserCreated?: boolean;
}

interface ModalitiesTableProps {
    aetData: AetData[];
    onDeleteAet: (aetName: string) => void;
    onEditAet: (aet: AetData) => void;
}

const ModalitiesTable: React.FC<ModalitiesTableProps> = ({ aetData, onDeleteAet, onEditAet }) => {
    const columns: ColumnDef<AetData>[] = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'aet', header: 'AET', cell: info => <Badge value={info.getValue() as string} /> },
        { accessorKey: 'host', header: 'Host' },
        { accessorKey: 'manufacturer', header: 'Manufacturer' },
        {
            header: 'Actions',
            id: 'actions',
            cell: ({ row }) => (
                <>
                    <Button onClick={() => ReplayIcon(row.original)} color={Colors.primary}><ReplayIcon /></Button>
                    <Button onClick={() => EchoIcon(row.original)} color={Colors.secondary}><EchoIcon /></Button>
                </>
            )
        },
        {
            header: '',
            id: 'edit',
            cell: ({ row }) => row.original.isUserCreated ? (
                <EditIcon onClick={() => onEditAet(row.original)} className="mr-2 text-gray-600 cursor-pointer" />
            ) : null,
        },
        {
            id: 'delete',
            cell: ({ row }) => row.original.isUserCreated ? (
                <DeleteIcon onClick={() => onDeletePeer(row.original.name)} className="text-red-500 cursor-pointer" />
            ) : null,
        }
    ];

    return <Table columns={columns} data={aetData} headerColor={Colors.almond} />;
};

export default ModalitiesTable;
