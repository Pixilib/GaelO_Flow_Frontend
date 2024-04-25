import { useState } from 'react';
import { Colors } from "../../utils/enums";
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
import FilterTable from './FilterTable';
import Footer from '../table/Footer';

type TableProps<TData> = {
  data?: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableColumnFilters? :boolean;
  headerColor: Colors;
  className?: string;
};
//WIP : Pagination
function Table<T>({ data = [], columns, enableSorting = false, enableColumnFilters = false,  headerColor, className }: TableProps<T>) {

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
  const headerBgClass = `bg-${headerColor}`;

  return (
    <div className={`max-h-[500px] overflow-x-auto rounded-xl shadow-md ${className}`}>
      <table className={`min-w-full border-grayCustom ${className}`}>
        <thead className={headerBgClass}>
          {table.getHeaderGroups().map(headerGroup => (
            <>
              {/* Ligne pour les titres et les flèches de tri */}
              <tr key={headerGroup.id} className={headerBgClass}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    colSpan={header.column.getCanFilter() ? 1 : undefined}
                    className="h-2 px-2 py-3 text-xs font-bold tracking-wider text-center uppercase cursor-pointer md:px-4 lg:px-6"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center justify-center space-x-1">
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
                <tr key={`${headerGroup.id}-filters`} className="bg-${color}-filter">
                  {headerGroup.headers.map(header => (
                    <th
                      key={`${header.id}-filter`}
                      className="p-2 text-center md:px-4 lg:px-6"
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
            </>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={`${rowIndex % 2 === 0 ? 'bg-zinc-100' : 'bg-white'} ${table.getRowModel().rows.length - 1 === rowIndex ? 'last-row' : ''}`}
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
      <div className="w-full">
        <Footer
          table={table}
        />
      </div>
    </div>
  );
}
export default Table;
