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
  RowSelectionState,
} from '@tanstack/react-table';

import { Colors } from "../../utils/enums";
import FilterTable from './FilterTable';
import Footer from '../table/Footer';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';

export type textSize = "xxs" |"xs" | "sm" | "base" | "lg";

type TableProps<TData> = {
  data?: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableColumnFilters?: boolean;
  headerColor: Colors;
  headerTextSize?: textSize;
  className?: string;
  pageSize?: number; 
  pinFirstColumn?: boolean;
  pinLastColumn?: boolean; 
  enableRowSelection?: boolean;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  onRowClick?: (row: TData) => void;
  getRowStyles?: (row: TData) => React.CSSProperties | undefined;
  getRowClasses?: (row: TData) => string | undefined;
  selectedRowColor?: string;
  clickedRowColor?: string;
};

function Table<T>({
  data = [],
  columns,
  enableSorting = false,
  enableColumnFilters = false,
  headerColor,
  className,
  pageSize = 10,
  headerTextSize = "sm",
  pinFirstColumn = false,
  pinLastColumn = false,
  enableRowSelection = false,
  onRowSelectionChange,
  onRowClick,
  getRowStyles,
  getRowClasses,
  selectedRowColor = 'bg-blue-100',
  clickedRowColor = 'bg-primary'
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [clickedRowId, setClickedRowId] = useState<string | null>(null);

  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = table.getSelectedRowModel().flatRows.map(row => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, onRowSelectionChange]);

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
    state: {
      sorting,
      columnFilters,
      pagination,
      rowSelection,
    },
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
    <div className={`overflow-visible custom-scrollbar ${className}`}>
      <div className="overflow-x-auto border rounded shadow-lg custom-scrollbar rounded-t-xl">
        <table className={`min-w-full border-grayCustom ${className}`}>
          <thead className={headerClass}>
            {table.getHeaderGroups().map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                <tr key={headerGroup.id} className={headerClass}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      colSpan={header.column.getCanFilter() ? 1 : undefined}
                      className={`h-2 px-2 py-2 font-bold tracking-wider text-center uppercase cursor-pointer md:px-4 lg:px-6 ${getColumnClasses(index, headerGroup.headers.length)}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className={`flex items-center justify-center space-x-1 ${headerText}`}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {enableSorting && header.column.getCanSort() && (
                          <span className="ml-1 text-lg text-white cursor-pointer">
                            {header.column.getIsSorted() === 'desc' ? (
                              <FcAlphabeticalSortingZa />
                            ) : (
                              <FcAlphabeticalSortingAz />
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
            {table.getRowModel().rows.map((row, rowIndex) => {
              const isSelected = rowSelection[row.id];
              const isClicked = row.id === clickedRowId;
              const rowClasses = getRowClasses ? getRowClasses(row.original) : '';
              const rowStyles = getRowStyles ? getRowStyles(row.original) : {};
              return (
                <tr
                  key={`row-${row.id}-${rowIndex}`}
                  className={`${rowClasses} ${isSelected ? selectedRowColor : ''} ${isClicked ? clickedRowColor : ''}`}
                  style={rowStyles}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                      setClickedRowId(row.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={`cell-${row.id}-${cell.id}-${cellIndex}`}
                      className={`px-1 py-2 text-center whitespace-nowrap md:px-4 lg:px-6 ${getColumnClasses(cellIndex, row.getVisibleCells().length)}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white shadow-md rounded-b-xl">
        {/* Affiche le pied de tableau uniquement si des données sont disponibles */}
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