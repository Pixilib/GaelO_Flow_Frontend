import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

type TableProps = {
    data: Object[],
    columns: Array<any>
};

const Table = ({ data, columns }: TableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="border-b-2 border-gray-300">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-2 py-3 text-left text-xs font-bold text-bg-gray uppercase tracking-wider md:px-4 lg:px-6 min-w-[120px] text-lg border-b-2 border-gray">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-2 py-4 whitespace-nowrap md:px-4 lg:px-6 min-w-[120px]">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
