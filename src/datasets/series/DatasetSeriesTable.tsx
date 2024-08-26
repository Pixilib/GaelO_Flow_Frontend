import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Table } from "../../ui";
import { Colors, Series, Series as SeriesType } from "../../utils";
import DatasetSeriesActions from "./DatasetSeriesActions";

type DatasetSeriesTableProps = {
    series: SeriesType[];
    onActionClick: (action: string, series: Series) => void};

const DatasetSeriesTable: React.FC<DatasetSeriesTableProps> = ({ series, onActionClick }) => {
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
                return <DatasetSeriesActions series={seriesData} onActionClick={onActionClick} />;
            },
        },
    ], []);
    return (
        <Table
            columns={columns}
            data={rows ?? []}
            headerColor={Colors.white}
            headerTextSize="xs"
            className="text-xs bg-gray-100"
        />
    );
};

export default DatasetSeriesTable;
