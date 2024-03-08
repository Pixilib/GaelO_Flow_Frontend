import Table from "../ui/Table"
import Badge from '../ui/Badge';

import Restart from '../assets/restart.svg?react';


const JobTable = (data:any) => {

    const columns = [
        {
            accessorKey: 'ID',
            header: 'Id',
            cell: row => <span className='text-xs text-slate-500 '>{row.getValue() as string}</span>
        },
        {
            accessorKey: 'Type',
            header: 'Type',
        },
        {
            accessorKey: 'Progress',
            header: 'Progress',
            cell: row => <Badge value={row.getValue()} className='bg-badge-gray text-badge-blue-text' />
        },
        {
            accessorKey: 'State',
            header: 'State',
            cell: row => <Badge value={row.getValue()} />
        },
        {
            header: 'Actions',
            cell: ({ row }: any) => {
                return (
                    <div className="flex justify-center">
                        <Restart />

                    </div>
                );
            },
        },


    ]

    return (
        <Table data={data.data} columns={columns} />
    )

}
export default JobTable;