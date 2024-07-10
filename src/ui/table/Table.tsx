import React, { useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel
} from '@tanstack/react-table';

import { Colors } from "../../utils/enums";
import FilterTable from './FilterTable';
import Footer from '../table/Footer';
import { FcAlphabeticalSortingAz, FcAlphabeticalSortingZa } from 'react-icons/fc';

// Définition des tailles de texte pour les en-têtes de tableau
export type textSize = "xs" | "sm" | "base" | "lg";

// Props du composant Table
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
  onRowClick?: (row: TData) => void;
  getRowStyles?: (raw: TData) => object | undefined;
  getRowClasses?: (raw: TData) => string | undefined;
  selectedColor?: string;
};

// Composant Table principal
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
  onRowClick,
  getRowStyles = () => undefined,
  getRowClasses = () => undefined,
  selectedColor = 'bg-primary' // Couleur par défaut pour la sélection
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  // Gestion du changement de taille de page
  const handlePageSizeChange = (newPageSize: number) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: newPageSize,
    }));
  };

  // Utilisation de useReactTable pour initialiser le tableau avec les données et les options
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
    enableColumnFilters,
    enableSorting,
    meta: {
      getRowStyles: getRowStyles, 
      getRowClasses: (row) => {
        const classes = getRowClasses ? getRowClasses(row) : undefined;
        return row.id === selectedRow ? selectedColor : classes; // Applique la couleur de sélection si la ligne est sélectionnée
      }
    }
  });

  // Classes pour les colonnes fixes à gauche ou à droite
  const headerClass = `bg-${headerColor}`;
  const headerText = `text-${headerTextSize}`;
  const firstColumnClass = `sticky left-0 ${headerClass}`;
  const lastColumnClass = `sticky right-0 bg-white`;

  // Fonction pour obtenir les classes CSS spécifiques d'une colonne
  const getColumnClasses = (index: number, length: number) => {
    if (pinFirstColumn && index === 0) return firstColumnClass;
    if (pinLastColumn && index === length - 1) return lastColumnClass;
  };

  return (
    <div className={`rounded-xl shadow-md overflow-visible custom-scrollbar ${className}`}>
      <div className="overflow-x-auto custom-scrollbar rounded-t-xl">
        <table className={`min-w-full border-grayCustom ${className}`}>
          <thead className={`${headerClass} shadow-sm`}>
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <React.Fragment key={`row-${row.id}-${rowIndex}`}>
                <tr
                  className={`${table.options.meta?.getRowClasses(row)} border-b border-gray-300`} // Ajout de la ligne grise foncée
                  style={table.options.meta?.getRowStyles(row)}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                      setSelectedRow(row.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => (
                    <td
                      key={`cell-${row.id}-${cell.id}-${cellIndex}`}
                      className={`px-2 py-4 text-center whitespace-nowrap md:px-4 lg:px-6 ${getColumnClasses(cellIndex, row.getVisibleCells().length)} ${row.id === selectedRow ? 'text-white' : ''}`}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
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
