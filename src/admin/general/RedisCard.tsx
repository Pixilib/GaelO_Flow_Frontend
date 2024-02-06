import { ChangeEvent, useState } from "react"
import Card, { CardHeader, CardBody, CardFooter } from '../../RenderComponents/Card';
import Input from "../../RenderComponents/Input";
import Table from '../../RenderComponents/Table';
import { createColumnHelper } from "@tanstack/react-table";
import Button from "../../RenderComponents/Button";

const redisCard = () => {
    const [address, setAddress] = useState('');
    const [port, setPort] = useState('');
    const [password, setPassword] = useState('');

    const columnHelper = createColumnHelper()
    const data: any = [
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

    ]

    const columns = [
        columnHelper.accessor('address', {
            header: 'Address2',
            cell: ({ row, getValue }) => {
                console.log(row)
                return <Button onClick={()=>{console.log(row.original.address)}} className="bg-primary" target="_blank" rel="noopener noreferrer">Edit</Button>
            },
        }),
        columnHelper.accessor('port', {
            header: 'Port',
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('password', {
            header: 'Password',
            cell: info => '••••••',
        }),
    ];


    return (
        <Card>
            <CardHeader title="Redis Setting" />
            <CardBody>
                <div className="flex justify-center">
                    <div className="w-1/2 mb-4">
                        <Input className="w-full" label="Address" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)} value={address} />
                        <Input className="w-full" label="Port" type="number" onChange={(e: ChangeEvent<HTMLInputElement>) => setPort(e.target.value)} value={port} />
                        <Input className="w-full" label="Password" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} value={password} />
                        <Table columns={columns} data={data} />
                    </div>

                </div>
            </CardBody>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default redisCard
