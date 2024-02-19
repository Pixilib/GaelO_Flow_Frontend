import React from 'react';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';

type DataType = {
    username?: string;
    address?: string;
    port?: number;
    password?: string;
};

type ColumnType = ColumnDef<DataType>;

type TableProps = {
    data: DataType[];
    columns: ColumnType[];
};

const Table: React.FC<TableProps> = ({ data, columns }) => {
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
                                const textAlignClass = ['address', 'port', 'password', 'username'].includes(header.id) ? 'text-center' : 'text-left';
                                return (
                                    <th key={header.id} className={`px-2 py-3 ${textAlignClass} text-xs font-bold text-dark uppercase tracking-wider md:px-4 lg:px-6 min-w-[120px] border-b-2 border-gray`}>
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
                                const isCenteredColumn = ['address', 'port', 'password', 'username'].includes(cell.column.id);
                                const textAlignClass = isCenteredColumn ? 'text-center' : 'text-left';
                                return (
                                    <td key={cell.id} className={`px-2 py-4 whitespace-nowrap md:px-4 lg:px-6 ${textAlignClass}`}>
                                        {cell.column.id === 'port' ? (
                                            <span className="inline-flex items-center justify-center px-3 py-1.5 bg-green-200 text-green-800 rounded-full">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </span>
                                        ) : (
                                            flexRender(cell.column.columnDef.cell, cell.getContext())
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
