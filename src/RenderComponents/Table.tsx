import React, { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table';

type TableProps<T> = {
    data: T[];
    columns: ColumnDef<T, unknown>[];
};

const Table = <T,>({ data, columns }: TableProps<T>) => {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableSorting: true,
    });

    return (
        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
            <table className="min-w-full bg-white rounded-lg">
                <thead className="border-b-2 border-gray">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const sortIcon = header.column.getCanSort()
                                    ? header.column.getIsSorted() === 'desc'
                                        ? ' 🔽'
                                        : header.column.getIsSorted() === 'asc'
                                        ? ' 🔼'
                                        : ' ⬍' 
                                    : '';
                                return (
                                    <th
                                        key={header.id}
                                        className="px-2 py-3 text-xs font-bold tracking-wider text-center text-gray-600 uppercase md:px-4 lg:px-6"
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {sortIcon}
                                    </th>
                                );
                            })}
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
