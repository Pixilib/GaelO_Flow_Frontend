import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';
import Button from '../../ui/Button';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
interface AetData {
    name: string;
    Aet: number;
    Host: string;
    Port: number;
    Manufacturer: string;
}

interface AetProps {
    aetData: AetData[];
}

const Aet: React.FC<AetProps> = ({ aetData }) => {
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
            accessorKey: 'Port',
            header: 'PORT',
        },
        {
            accessorKey: 'Manufacturer',
            header: 'MANUFACTURER',
        },
        {
            accessorKey: 'EchoAet',
            header: 'ECHO AET',
        },
        {
            accessorKey: 'RemoveAet',
            header: 'REMOVE AET',
        },
    ];

    return (
        <Card>
            <CardHeader title="AETS" />
            <CardBody>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-4">
                        <Table columns={columns} data={aetData} />
                    </div>
                    <div className="flex justify-center w-full mt-2">
                        <Button color="success">
                            <span className="flex items-center mr-2">
                                <MoreIcon className="mr-2" size={24} />
                                New AET
                            </span>
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default Aet;
