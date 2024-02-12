import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../RenderComponents/Button";
import { Colors } from "../../utils/enums";


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
            cell: info => <Button color={Colors.primary} onClick={() => { console.log(info.row.original.address); }}>Edit</Button>,
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
    <Card>
      <CardHeader title="Redis Setting" />
      <CardBody>
        <div className="flex justify-center">
          <div className="w-full mb-4">
     
            <div className="min-w-full overflow-hidden bg-white border-b border-gray-200 divide-y divide-gray-200 shadow sm:rounded-lg">
              <Table columns={columns} data={data} />
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter />
    </Card>
  );
};

export default RedisCard;
