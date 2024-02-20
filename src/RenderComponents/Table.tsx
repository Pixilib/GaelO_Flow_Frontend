import React from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';

type TableProps<T> = {
    data: T[];
    columns: ColumnDef<T, unknown>[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
            <table className="min-w-full bg-white rounded-lg">
                <thead className="border-b-2 border-gray">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-2 py-3 text-xs font-bold tracking-wider text-center text-gray-600 uppercase md:px-4 lg:px-6">
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
                                <td key={cell.id} className="px-2 py-4 text-center whitespace-nowrap md:px-4 lg:px-6">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
