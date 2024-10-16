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

export type textSize = "xxs" | "xs" | "sm" | "base" | "lg";

type TableProps<TData> = {
  data?: TData[];
  id?: string;
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableColumnFilters?: boolean;
  headerColor?: Colors;
  headerTextSize?: textSize;
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
  onCellEdit?: (rowIndex: string | number, columnId: any, value: any) => void
  getRowId?: (originalRow: TData, index: number) => string
};

function Table<T>({
  data = [],
  columns,
  id = 'id',
  enableSorting = false,
  enableColumnFilters = false,
  headerColor = Colors.white,
  className,
  pageSize = 10,
  headerTextSize = "sm",
  pinFirstColumn = false,
  pinLastColumn = false,
  enableRowSelection = false,
  selectedRow = {},
  columnVisibility = {},
  onRowSelectionChange = (selectedState: Record<string, boolean>) => { return null },
  onRowClick,
  getRowStyles,
  getRowClasses = (row) => 'bg-indigo-50',
  onCellEdit = () => { },
  getRowId = (originalRow, index) => { return originalRow?.[id] ?? index }
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState(selectedRow)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  useEffect(() => {
    onRowSelectionChange(rowSelection)
  }, [JSON.stringify(rowSelection)])

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
    }));
  };

  const selectionColumn: ColumnDef<T> = {
    id: 'selection',
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
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
      columnVisibility: columnVisibility
    },
    getRowId: getRowId,
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
      getRowStyles: (row: any) => {
        const styles = getRowStyles ? getRowStyles(row) : undefined;
        return styles;
      },
      getRowClasses: (row: any) => {
        const classes = getRowClasses ? getRowClasses(row) : undefined;
        return classes;
      },
      updateData: (
        rowIndex: string | number,
        columnId: any,
        value: any
      ) => {
        onCellEdit(rowIndex, columnId, value)
      }
    }
  });

  const textXXS = "text-[0.491rem]";
  const headerClass = `bg-${headerColor}`;
  const headerText = headerTextSize === "xxs" ? `${textXXS}` : `text-${headerTextSize}`;
  const firstColumnClass = `sticky left-0 ${headerClass}`;
  const lastColumnClass = `sticky right-0 bg-white`;

  const getColumnClasses = (index: number, length: number) => {
    if (pinFirstColumn && index === 0) return firstColumnClass;
    if (pinLastColumn && index === length - 1) return lastColumnClass;
    return '';
  };

  return (
    <div className={`overflow-x-auto border rounded-xl shadow-lg custom-scrollbar ${className}`}>
      <table className={`min-w-full border-gray-custom ${className}`}>
        <thead className={`${headerClass}`}>
          {table.getHeaderGroups().map(headerGroup => (
            <React.Fragment key={headerGroup.id}>
              <tr key={headerGroup.id} className={headerClass}>
                {headerGroup.headers.map((header, index) => (
                  <th
                    key={header.id}
                    colSpan={header.column.getCanFilter() ? 1 : undefined}
                    className={`h-2 break-words px-2 pt-5 pb-3 py-2 font-bold tracking-wider text-center uppercase cursor-pointer md:px-4 lg:px-6 ${getColumnClasses(index, headerGroup.headers.length)}`}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className={`flex items-center justify-center space-x-1 ${headerText}`}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {enableSorting && header.column.getCanSort() && (
                        <span className="ml-1 text-lg text-white cursor-pointer">
                          {header.column.getIsSorted() === 'desc' ? (
                            <SortZa />
                          ) : (
                            <SortAz />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
              {headerGroup.headers.some(header => header.column.getCanFilter()) && (
                <tr key={`${headerGroup.id}-filters`} className={`bg-${headerColor}`}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={`${headerGroup.id}-${header.id}-filter-${index}`}
                      className={`p-2 text-center md:px-4 lg:px-6 ${getColumnClasses(index, headerGroup.headers.length)}`}
                    >
                      {header.column.getCanFilter() ? (
                        <div onClick={e => e.stopPropagation()}>
                          <FilterTable column={header.column} table={table} />
                        </div>
                      ) : null}
                    </th>
                  ))}
                </tr>
              )}
            </React.Fragment>
          ))}
        </thead>
        <tbody className="overflow-y-auto custom-scrollbar">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <React.Fragment key={`row-${row.id}-${rowIndex}`}>
              <tr
                className={`${table.options.meta?.getRowClasses(row)} border-b border-gray-100`}
                style={table.options.meta?.getRowStyles(row)}
                onClick={() => {
                  if (onRowClick) {
                    onRowClick(row.original);
                  }
                }}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={`cell-${row.id}-${cell.id}-${cellIndex}`}
                    className={`px-1 py-2 text-center whitespace-normal break-words md:px-4 lg:px-6 ${getColumnClasses(cellIndex, row.getVisibleCells().length)}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>

      </table>
      <div className="w-full bg-white shadow-sm rounded-b-xl">
        {data.length > 0 && table ? (
          <Footer
            table={table}
            onPageSizeChange={handlePageSizeChange}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Table;