import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../ui";
import { Colors, Series as SeriesType } from "../../utils";
import SeriesActions from "./SeriesActions";

type SeriesTableProps = {
    series: SeriesType[];
    selectedRows?: Record<string, boolean>;
    onRowClick?: (seriesId: string) => void;
    onActionClick: (action: string, series: SeriesType) => void;
};

const SeriesTable: React.FC<SeriesTableProps> = ({
    series,
    selectedRows,
    onRowClick,
    onActionClick,
}) => {
    const rows = useMemo(() => series.map(s => ({
        ...s,
        ...s.mainDicomTags,
        instancesLength: s.instances?.length ?? 0
    })), [series]);

    const columns: ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: "seriesDescription",
            header: "Series Description",
        },
        {
            accessorKey: "modality",
            header: "Modality",
        },
        {
            accessorKey: "seriesNumber",
            header: "Series Number",
        },
        {
            accessorKey: "instancesLength",
            header: "Instances",
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const seriesData = row.original;
                return <SeriesActions series={seriesData} onActionClick={onActionClick} />;
            },
        },
    ], [onActionClick]);

    const getRowClasses = (row: SeriesType) => {
        if (selectedRows?.[row.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer dark:hover:bg-indigo-700';
        }
    };

    return (
        <Table
            columns={columns}
            data={rows ?? []}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="text-xs bg-gray-100 dark:bg-slate-950 dark:text-white"
            getRowClasses={getRowClasses}
            onRowClick={(row) => onRowClick && onRowClick(row.id)}
        />
    );
}

export default SeriesTable;
