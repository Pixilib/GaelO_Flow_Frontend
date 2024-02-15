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
                <thead className="border-b-2 border-gray-200">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-2 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider md:px-4 lg:px-6 min-w-[120px] text-lg border-b-2 border-gray">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                const isPortColumn = cell.column.id === 'port';
                                return (
                                    <td key={cell.id} className="px-2 py-4 whitespace-nowrap md:px-4 lg:px-6 min-w-[120px]">
                                        {isPortColumn ? (
                                            <span className="w-12 h-[27px] px-3 py-2.5 bg-green-200 text-dark rounded-lg flex justify-center items-center gap-2">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </span>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
