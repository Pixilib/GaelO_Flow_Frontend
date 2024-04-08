import React from 'react';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../utils/enums';
import Button from '../../ui/Button';

interface AetData {
    name: string;
    aet: string;
    host: string;
    manufacturer: string;
}

interface ModalitiesTableProps {
    aetData: AetData[];
    onDeleteAet: (aetName: string) => void;
}

const ModalitiesTable: React.FC<ModalitiesTableProps> = ({ aetData, onDeleteAet }) => {
    const columns: ColumnDef<AetData>[] = [
        { accessorKey: 'name', header: 'Name' },
        { accessorKey: 'aet', header: 'AET', cell: info => <Badge value={info.getValue() as string} /> },
        { accessorKey: 'host', header: 'Host' },
        { accessorKey: 'manufacturer', header: 'Manufacturer' },
        {
            id: 'delete',
            cell: ({ row }) => (
                <Button onClick={() => onDeleteAet(row.original.name)} color={Colors.danger}>Delete</Button>
            )
        }
    ];

    return <Table columns={columns} data={aetData} headerColor={Colors.almond} />;
};

export default ModalitiesTable;
