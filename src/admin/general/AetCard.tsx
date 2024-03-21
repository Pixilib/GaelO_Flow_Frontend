import React, { useState } from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card';
import Table from '../../ui/table/Table';
import Badge from '../../ui/Badge';
import Button from '../../ui/Button';
import { ColumnDef } from '@tanstack/react-table';
import { AiOutlinePlus as MoreIcon } from "react-icons/ai";
import NewAetCard from './NewAetCard';
import { Colors } from '../../utils/enums';

interface AetData {
    name: string;
    Aet: number;
    Host: string;
    Manufacturer: string;
}

interface AetProps {
    aetData: AetData[];
}

const Aet: React.FC<AetProps> = ({ aetData }) => {
    const [showNewAetCard, setShowNewAetCard] = useState(false);

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
    ];

    const handleNewAetClick = () => setShowNewAetCard(true);

    return (
        <Card>
            <CardHeader title="AETS" color={Colors.primary} />
            <CardBody color={Colors.light}>
                <div className="flex flex-col items-center">
                    <div className="w-full mb-4">
                        <Table columns={columns} data={aetData} />
                    </div>
                    <div className="flex justify-center w-full mt-2 mb-4">
                        <Button color="sucess" onClick={handleNewAetClick}>
                            <span className="flex items-center mr-2">
                                <MoreIcon className="mr-2" size={24} />
                                New AET
                            </span>
                        </Button>
                    </div>
                    {showNewAetCard && <div className="w-full mt-4">
                        <NewAetCard onClose={() => setShowNewAetCard(false)} />
                    </div>}
                </div>
            </CardBody>
        </Card>
    );
};

export default Aet;
