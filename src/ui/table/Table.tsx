import { useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,
    getPaginationRowModel,
} from '@tanstack/react-table';
import FilterTable from './FilterTable'; // Assurez-vous que le chemin d'importation est correct
import Footer from '../table/Footer';

type TableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData>[];
    enableSorting?: boolean;
    classForThead?: string;
};
//WIP : Pagination
function Table<T>({ data, columns, enableSorting = true, classForThead }: TableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
      });


    const table = useReactTable<T>({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableColumnFilters: true,
        enableSorting,
    });

    return (
        <div className="max-h-[500px] overflow-x-auto rounded-xl">
            <table className="min-w-full bg-white border-grayCustom">
                <thead className={`border-grayCustom  ${classForThead}`}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                const isSortedDesc = header.column.getIsSorted() === 'desc';
                                const isSortedAsc = header.column.getIsSorted() === 'asc';
                                // Condition pour afficher le composant de filtre
                                const canFilter = header.column.columnDef.enableColumnFilter ?? true;
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
                                            {/* Rendre conditionnellement le composant FilterTable */}
                                            {canFilter !== false && <FilterTable column={header.column} table={table} />}
                                            {header.column.getCanSort() && (
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const isDesc = isSortedAsc || (!isSortedAsc && !isSortedDesc);
                                                        setSorting([{ id: header.id, desc: isDesc }]);
                                                    }}
                                                    className={`cursor-pointer`}
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
                <div className="flex ">
                    <Footer
                        pagination={{
                            pageIndex: table.getState().pagination.pageIndex,
                            pageCount: table.getPageCount(),
                            canPreviousPage: table.getCanPreviousPage(),
                            canNextPage: table.getCanNextPage(),
                        }}
                        setPageIndex={table.setPageIndex}
                        className="justify-end"
                    />
                </div>
            </table>
        </div>
    );
}
export default Table;
