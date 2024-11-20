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
    onRowSelectionChange = () => {},
    onRowClick,
    getRowStyles,
    getRowClasses = () => 'bg-indigo-50',
    onCellEdit = () => {},
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
    };

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
        'white': 'bg-white dark:bg-gray-800',
        'primary': 'bg-primary-active text-white',
    }

    const headerText = headerTextSize === "xxs" ? "text-[0.491rem]" : `text-${headerTextSize}`;

    const firstColumnClass = `sticky left-0 ${headerClass[headerColor]} border-b border-gray-300 text-center`;
    const lastColumnClass = "sticky right-0 bg-white";

    const getColumnClasses = (index: number, length: number) => {
        if (pinFirstColumn && index === 0) return firstColumnClass;
        if (pinLastColumn && index === length - 1) return lastColumnClass;
        return '';
    };

    return (
        <div className={`overflow-x-auto border rounded-xl shadow-lg custom-scrollbar ${className}`}>
            <table className="min-w-full border-gray-custom">
                <thead className={`bg-${headerColor} border-b border-gray-300 ${headerclassName}`}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => (
                                <th
                                    key={header.id}
                                    colSpan={header.column.getCanFilter() ? 1 : undefined}
                                    className={`h-2 px-2 pt-5 pb-3 py-2 font-bold tracking-wider uppercase cursor-pointer md:px-4 lg:px-6 ${getColumnClasses(index, headerGroup.headers.length)}`}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    <div className={`flex items-center ${headerText}`}>
                                        <div className="text-left">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </div>
                                        {enableSorting && header.column.getCanSort() && (
                                            <span className="ml-1 text-lg cursor-pointer">
                                                {header.column.getIsSorted() === 'desc' ? <SortZa /> : <SortAz />}
                                            </span>
                                        )}
                                    </div>
                                    {header.column.getCanFilter() && (
                                        <div className="mt-2 text-left">
                                            <FilterTable column={header.column} table={table} />
                                        </div>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr
                            key={row.id}
                            className={`border-b ${getRowClasses(row.original)}`}
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
