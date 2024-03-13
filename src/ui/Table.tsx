import { useState, useMemo } from 'react';
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
    const [searchValue, setSearchValue] = useState<string>('');


    const filteredData = useMemo(() => {
        if (!searchValue) return data;
        return data.filter(row =>
            columns.some(column => {
                const value = row[column.accessorKey as keyof T];
                return value !== undefined
                    ? String(value).toLowerCase().includes(searchValue.toLowerCase())
                    : false
            })
        );
    }, [data, columns, searchValue]);

    const table = useReactTable<T>({
        data: filteredData,
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
        <div>
            <input type="text"
             value={searchValue}
             onChange={e => setSearchValue(e.target.value)}
             placeholder="Search..."
             className="px-2 py-1 mb-4 border rounded"
            />
            <div className="max-h-[500px] overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead className="border-b-2 border-grayCustom">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    const isSortedDesc = header.column.getIsSorted() === 'desc';
                                    const isSortedAsc = header.column.getIsSorted() === 'asc';
                                    return (
                                        <th
                                            key={header.id}
                                            className={`cursor-pointer px-2 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-600 md:px-4 lg:px-6 ${!header.column.getCanSort() ? 'cursor-default' : ''
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
                                    <td key={cell.id} className="px-2 py-4 text-center whitespace-nowrap md:px-4 lg:px-6">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
