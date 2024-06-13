import React from 'react';
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

import { Colors } from "../../utils/enums";

import FilterTable from './FilterTable';
import Footer from '../table/Footer';

export type textSize = "xs" | "sm" | "base" | "lg";

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
}: TableProps<T>) {
  const initialPageSize = Math.min(pageSize, data.length);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, // initial page index
    pageSize: initialPageSize, // default page size
  });

  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
    }));
  };

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableColumnFilters: enableColumnFilters,
    enableSorting,
  });

  const headerClass = `bg-${headerColor}`;
  const headerText = `text-${headerTextSize}`;

  const firstColumnClass = `sticky left-0 z-100 ${headerClass}`;
  const lastColumnClass = `sticky right-0 z-100 bg-white`;

  const getColumnClasses = (index: number, length: number) => {
    if (pinFirstColumn && index === 0) return firstColumnClass;
    if (pinLastColumn && index === length - 1) return lastColumnClass;
    return 'z-10';
  };

  return (
    <div className={`rounded-xl shadow-md overflow-visible custom-scrollbar ${className}`}>
      <div className="overflow-x-auto custom-scrollbar rounded-xl">
        <table className={`min-w-full border-grayCustom ${className}`}>
          <thead className={headerClass}>
            {table.getHeaderGroups().map(headerGroup => (
              <React.Fragment key={headerGroup.id}>
                {/* Ligne pour les titres et les flèches de tri */}
                <tr key={headerGroup.id} className={headerClass}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={header.id}
                      colSpan={header.column.getCanFilter() ? 1 : undefined}
                      className={`h-2 px-2 py-3 font-bold tracking-wider text-center uppercase cursor-pointer md:px-4 lg:px-6 ${getColumnClasses(index, headerGroup.headers.length)}`}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className={`flex items-center justify-center space-x-1 ${headerText}`}>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="cursor-pointer">
                            {header.column.getIsSorted() === 'desc' ? '▼' : '▲'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
                {/* Ligne distincte pour les filtres si au moins un filtre est présent */}
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
              <tr
                key={`row-${row.id}-${rowIndex}`}
                className={`${rowIndex % 2 === 0 ? 'bg-zinc-100' : 'bg-white'}`}
              >
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <td
                    key={`cell-${row.id}-${cell.id}-${cellIndex}`}
                    className={`px-2 py-4 text-center whitespace-nowrap md:px-4 lg:px-6 ${getColumnClasses(cellIndex, row.getVisibleCells().length)}`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-white shadow-md rounded-b-xl">
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
