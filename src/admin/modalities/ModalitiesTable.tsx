import React from 'react';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';
import { Colors } from '../../utils/enums';
import Button from '../../ui/Button';

interface AetData {
    name: string;
    Aet: number;
    Host: string;
    Manufacturer: string;
}

interface AetProps {
    aetData: AetData[];
    onDeleteAet: (aetname: string) => void;
}

const ModalitiesTable: React.FC<AetProps> = ({ aetData, onDeleteAet }) => {

    const columns: ColumnDef<AetData>[] = [
        {
            accessorKey: 'name',
            header: 'NAME',
        },
        {
            accessorKey: 'Aet',
            header: 'AET',
            cell: (info) => <Badge value={info.getValue() as number} />,
        },
        {
            accessorKey: 'Host',
            header: 'HOST',
        },
        {
            accessorKey: 'Manufacturer',
            header: 'MANUFACTURER',
        },
        {
            id: "delete",
            cell: ({ row }) => <>
                <Button onClick={() => onDeleteAet(row.original.name)} color={Colors.danger}>Delete</Button>            </>
        }
    ];

    return (
        <Table columns={columns} data={aetData} headerColor={Colors.almond} />
    );
};

export default ModalitiesTable;
