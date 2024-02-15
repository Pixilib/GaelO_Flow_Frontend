import React from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

type TableProps = {
    data: Object[],
    columns: Array<any>
};

const Table = ({ data, columns }: TableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg">
                <thead className="border-b-2 border-gray-200">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => {
                                // Applique un centrage pour les colonnes spécifiées
                                const textAlignClass = ['address', 'port', 'password'].includes(header.id) ? 'text-center' : 'text-left';
                                return (
                                    <th key={header.id} className={`px-2 py-3 ${textAlignClass} text-xs font-bold text-dark uppercase tracking-wider md:px-4 lg:px-6 min-w-[120px] text-lg border-b-2 border-gray`}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => {
                                const isCenteredColumn = ['address', 'port', 'password'].includes(cell.column.id);
                                const textAlignClass = isCenteredColumn ? 'text-center' : 'text-left';
                                const cellContent = flexRender(cell.column.columnDef.cell, cell.getContext());
                                return (
                                    <td key={cell.id} className={`px-2 py-4 whitespace-nowrap md:px-4 lg:px-6 min-w-[120px] ${textAlignClass}`}>
                                        {cell.column.id === 'port' ? (
                                            <span className="inline-flex items-center w-12 h-[27px] px-3 py-2.5 bg-green-200 text-dark rounded-lg  justify-center items-center gap-2">                                                {cellContent}
                                            </span>
                                        ) : (
                                            cellContent
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
