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
};

function Table<T>({ data = [], columns, enableSorting = false, enableColumnFilters = false, headerColor, className, pageSize = 10, headerTextSize = "sm" }: TableProps<T>) {
  const initialPageSize = Math.min(pageSize, data.length);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: initialPageSize, //default page size
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
  const headerClass = `bg-${headerColor}`
  const headerText = `text-${headerTextSize}`
  return (
    <div className={`max-h-[500px] rounded-xl shadow-md overflow-auto ${className}`}>
      <table className={`min-w-full rounded-xl border-grayCustom overflow-auto ${className}`}>
        <thead className={headerClass}>
          {table.getHeaderGroups().map(headerGroup => (
            <>
              {/* Ligne pour les titres et les flèches de tri */}
              <tr key={headerGroup.id} className={headerClass}>
                {headerGroup.headers.map((header,index) => (
                  <th
                    key={`${header.id}-${index}`}
                    colSpan={header.column.getCanFilter() ? 1 : undefined}
                    className="h-2 px-2 py-3 font-bold tracking-wider text-center uppercase cursor-pointer md:px-4 lg:px-6"
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
                <tr key={`${headerGroup.id}-filters`} className={`bg-${headerColor}-filter`}>
                  {headerGroup.headers.map((header, index) => (
                    <th
                      key={`${headerGroup.id}-${header.id}-filter-${index}`}
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
              key={`row-${row.id}-${rowIndex}`}
              className={`${rowIndex % 2 === 0 ? 'bg-zinc-100' : 'bg-white'} ${table.getRowModel().rows.length - 1 === rowIndex ? 'last-row' : ''}`}
            >
              {row.getVisibleCells().map((cell, cellIndex) => (
                <td key={`cell-${row.id}-${cell.id}-${cellIndex}`} className="px-2 py-4 text-center whitespace-nowrap md:px-4 lg:px-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className='w-full bg-white shadow-md rounded-b-xl '>
          <tr>
            <td colSpan={columns.length}>
              <Footer
                table={table}
                onPageSizeChange={handlePageSizeChange}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}
export default Table;
