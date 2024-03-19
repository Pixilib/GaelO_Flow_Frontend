import React from 'react';
import Card, { CardHeader, CardBody } from '../../ui/Card';
import Table from '../../ui/table/Table'
import Badge from '../../ui/Badge';
import { ColumnDef } from '@tanstack/react-table';

interface AetData {
  // Définissez ici les propriétés de votre objet AetData
  name: string;
  Aet: number;
  Host: string;
  Manufacturer: string;
  // Ajoutez les autres champs nécessaires
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
      cell: (row: any) => <Badge value={row.getValue() as number} />,
    },
    {
      accessorKey: 'Host',
      header: 'host',
    },
    {
        accessorKey: 'Manufacturer',
        header: 'MANUFACTURER',
      },  {
        accessorKey: 'EchoAet',
        header: 'ECHO AET',
      }, {
        accessorKey: 'Remove Aet',
        header: 'REMOVE AET',
      },  ];

  return (
    <Card>
      <CardHeader title="New AET" />
      <CardBody>
        <div className="flex justify-center">
          <div className="w-full mb-4">
            <Table columns={columns} data={aetData} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Aet;
