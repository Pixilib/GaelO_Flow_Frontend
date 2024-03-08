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
    data: T[];
    columns: ColumnDef<T, unknown>[];
    enableSorting?: boolean;
};

function Table<T>({ data, columns, enableSorting = true }: TableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable<T>({
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
        <div className="max-h-[500px] overflow-x-auto">
            <table className="min-w-full rounded-lg bg-white">
                <thead className="border-b-2 border-gray">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSortedDesc = header.column.getIsSorted() === 'desc';
                                const isSortedAsc = header.column.getIsSorted() === 'asc';
                                return (
                                    <th
                                        key={header.id}
                                        className={`text-gray-600 cursor-pointer px-2 py-3 text-center text-xs font-bold uppercase tracking-wider md:px-4 lg:px-6 ${!header.column.getCanSort() ? 'cursor-default' : ''
                                            }`}
                                        onClick={() => {
                                            const isDesc = isSortedAsc || (!isSortedAsc && !isSortedDesc);
                                            setSorting([{ id: header.id, desc: isDesc }]);
                                        }}
                                    >
                                        <div className="flex items-center justify-center">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            {header.column.getCanSort() && (
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const isDesc = isSortedAsc || (!isSortedAsc && !isSortedDesc);
                                                        setSorting([{ id: header.id, desc: isDesc }]);
                                                    }}
                                                    className={`cursor-pointer ${isSortedAsc || isSortedDesc ? Colors.dark : Colors.light}`}
                                                >
                                                    {isSortedDesc ? '▼' : '▲'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={`${rowIndex % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="whitespace-nowrap px-2 py-4 text-center md:px-4 lg:px-6">
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
