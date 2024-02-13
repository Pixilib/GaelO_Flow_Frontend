import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";

import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Table from '../../RenderComponents/Table';

interface RedisData {
  address: string;
  port: number;
  password: string;
}

const RedisCard: React.FC = () => {
  const columnHelper = createColumnHelper<RedisData>();
  const data = [
    {
      address: 'https://orthanc.fr',
      port: 8042,
      password: 'password',
    },
    {
      address: 'https://orthanc2.fr',
      port: 8043,
      password: 'password',
    },
  ];

  const columns = [
    columnHelper.accessor('address', {
      header: 'Address',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('port', {
      header: 'Port',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('password', {
      header: 'Password',
      cell: () => '••••••',
    }),
  ];

  return (
    <div className='mt-4'>
      <Card>
        <CardHeader title="Redis Settings" />
        <CardBody>
          <div className="flex justify-center">
            <div className="w-full mb-4">
              <div className="min-w-full overflow-hidden bg-white sm:rounded-lg">
                <Table columns={columns} data={data} />
              </div>
            </div>
          </div>
        </CardBody>
        <CardFooter />
      </Card>
    </div>
  );
};

export default RedisCard;
