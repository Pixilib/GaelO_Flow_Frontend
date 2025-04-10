import React, { useEffect, useState } from 'react';
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
    getFacetedRowModel,
    getFacetedMinMaxValues,
    getFacetedUniqueValues,
} from '@tanstack/react-table';
import { Colors } from "../../utils/enums";
import FilterTable from './FilterTable';
import Footer from '../table/Footer';
import { SortAz, SortZa } from '../../icons';
import EditableCell from './EditableCell';
import CheckBox from '../Checkbox';

export type TextSize = "xxs" | "xs" | "sm" | "base" | "lg";

interface TableProps<TData> {
    data?: TData[];
    id?: string;
    columns: ColumnDef<TData>[];
    enableSorting?: boolean;
    enableColumnFilters?: boolean;
    headerColor?: Colors;
    headerTextSize?: TextSize;
    className?: string;
    pageSize?: number;
    pinFirstColumn?: boolean;
    pinLastColumn?: boolean;
    enableRowSelection?: boolean;
    selectedRow?: Record<string, boolean>;
    columnVisibility?: Record<string, boolean>;
    onRowSelectionChange?: (selectedState: Record<string, boolean>) => void;
    onRowClick?: (row: TData) => void;
    getRowStyles?: (row: TData) => React.CSSProperties | undefined;
    getRowClasses?: (row: TData) => string | undefined;
    onCellEdit?: (rowIndex: string | number, columnId: any, value: any) => void;
    getRowId?: (originalRow: TData, index: number) => string;
    headerclassName?: string;
}

function Table<T>({
    data = [],
    columns,
    id = 'id',
    enableSorting = false,
    enableColumnFilters = false,
    headerColor = Colors.white,
    headerclassName = '',
    className,
    pageSize = 10,
    headerTextSize = "sm",
    pinFirstColumn = false,
    pinLastColumn = false,
    enableRowSelection = false,
    selectedRow = {},
    columnVisibility = {},
    onRowSelectionChange = () => { },
    onRowClick,
    getRowStyles,
    getRowClasses = () => 'bg-indigo-50 dark:bg-slate-950 text-black dark:text-white',
    onCellEdit = () => { },
    getRowId = (originalRow, index) => originalRow?.[id] ?? index,
}: TableProps<T>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState(selectedRow);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize,
    });

    useEffect(() => {
        onRowSelectionChange(rowSelection);
    }, [JSON.stringify(rowSelection)]);

    const handlePageSizeChange = (newPageSize: number) => {
        setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
    };

    const selectionColumn: ColumnDef<T> = {
        id: 'selection',
        header: ({ table }) => (
            <CheckBox
                checked={table.getIsAllRowsSelected()}
                onChange={table.getToggleAllRowsSelectedHandler()}
            />
        ),
        cell: ({ row }) => (
            <CheckBox
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
                onClick={(e) => e.stopPropagation()}
            />
        ),
        size : 30    };

    const tableColumns = enableRowSelection ? [selectionColumn, ...columns] : columns;

    const table = useReactTable<T>({
        data,
        columns: tableColumns,
        defaultColumn: {
            cell: EditableCell,
        },
        state: {
            sorting,
            columnFilters,
            pagination,
            rowSelection: selectedRow,
            columnVisibility,
        },
        getRowId,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        enableRowSelection,
        enableColumnFilters,
        enableSorting,
        meta: {
            getRowStyles,
            getRowClasses,
            updateData: onCellEdit,
        },
    });

    const headerClass = {
        'white': 'bg-white dark:bg-neutral-800 text-black dark:text-white', // Adjust for dark mode
    }

    const headerText = headerTextSize === "xxs" ? "text-[0.491rem]" : `text-${headerTextSize}`;

    const firstColumnClass = `sticky left-0 ${headerClass[headerColor]} border-b border-gray-300 dark:border-gray-700  text-center`;
    const lastColumnClass = "sticky right-0 bg-white dark:bg-gray-800 text-black dark:text-white";

    const getColumnClasses = (index: number, length: number) => {
        if (pinFirstColumn && index === 0) return firstColumnClass;
        if (pinLastColumn && index === length - 1) return lastColumnClass;
        return '';
    };

    const getSortedIcon = (column) : React.ReactNode => {
        const direction  = column.getIsSorted()
        if(!direction) return <SortAz className={"opacity-30"} /> 
        if(direction === 'desc') return <SortZa />
        if(direction === 'asc') return <SortAz />
    }

    return (
        <div className={`overflow-x-auto rounded-xl shadow-lg custom-scrollbar ${className} dark:border-gray-700 dark:bg-black dark:text-white`}>
            <table className="min-w-full border-gray-custom dark:border-gray-600">
                <thead className={`bg-${headerColor} dark:bg-neutral-800 text-black dark:text-white border-b border-gray-300 dark:border-gray-700 ${headerclassName}`}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    colSpan={header.column.getCanFilter() ? 1 : undefined}
                                    style={{ width: `${header.getSize()}px` }}
                                    className={`p-4 font-bold tracking-wider uppercase cursor-pointer  ${getColumnClasses(index, headerGroup.headers.length)}`}
                                >
                                    <div className='flex flex-col'>
                                        <div className={`flex justify-between items-center w-full ${headerText}`} onClick={header.column.getToggleSortingHandler()}>
                                            <div className="text-left">
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </div>
                                            {enableSorting && header.column.getCanSort() && (
                                                <span className="ml-1 text-lg cursor-pointer">
                                                    {getSortedIcon(header.column)}
                                                </span>
                                            )}
                                        </div>
                                        {header.column.getCanFilter() && (
                                            <div className="mt-2 text-left w-full">
                                                <FilterTable columnDef={header.column.columnDef} column={header.column} table={table} />
                                            </div>
                                        )}
                                    </div>

                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={`border-b border-gray-custom dark:border-neutral-800 ${getRowClasses(row.original)}`}
                            style={getRowStyles?.(row.original)}
                            onClick={() => onRowClick?.(row.original)}
                        >
                            {row.getVisibleCells().map((cell, index) => (
                                <td
                                    key={cell.id}
                                    className={`px-1 py-2 md:px-4 lg:px-6 ${getColumnClasses(index, row.getVisibleCells().length)} text-left`}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer table={table} pageSize={pageSize} handlePageSizeChange={handlePageSizeChange} />
        </div>
    );
}

export default Table;
