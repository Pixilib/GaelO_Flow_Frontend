import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
} from '@tanstack/react-table';
import { Colors } from '../utils/enums';

type TableProps<T> = {
    data: any;
    columns: ColumnDef<T, unknown>[];
    enableSorting?: boolean;
};

const Table = <T,>({ data, columns, enableSorting = true }: TableProps<T>) => {
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
        enableSorting,
    });

    return (
        <div style={{ overflowX: 'auto', maxHeight: '500px' }}>
            <table className="min-w-full bg-white rounded-lg">
                <thead className="border-b-2 border-gray">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSortedDesc = header.column.getIsSorted() === 'desc';
                                const isSortedAsc = header.column.getIsSorted() === 'asc';
                                return (
                                    <th
                                        key={header.id}
                                        className={`px-2 py-3 text-xs font-bold tracking-wider text-center uppercase md:px-4 lg:px-6 ${header.column.getCanSort() ? 'cursor-pointer' : 'cursor-default'
                                            } text-gray-600`}
                                    >
                                        <div className="flex items-center justify-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <div className="flex flex-col ml-1">
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const isDesc = isSortedAsc || (!isSortedAsc && !isSortedDesc);
                                                        setSorting([{ id: header.id, desc: isDesc }]);
                                                    }}
                                                    className={`cursor-pointer ${isSortedAsc || isSortedDesc ? Colors.dark : Colors.light}}
                                                }`}
                                                >
                                                    {isSortedDesc ? '▼' : '▲'}
                                                </span>
                                            </div>
                                        </div>
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