import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Table } from "../../ui";
import { Colors } from "../../utils";
import DatasetSeriesActions from "./DatasetSeriesActions";
import Series from "../../model/Series";

type DatasetSeriesTableProps = {
    series: Series[];
    onActionClick: (action: string, seriesId: string) => void;
};

const DatasetSeriesTable: React.FC<DatasetSeriesTableProps> = ({ series, onActionClick }) => {

    const data = useMemo(() => {
        return series.map((series) => series.toJSON())
    },
    [series.length]
)

    const columns: ColumnDef<any>[] = useMemo(
        () => [
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
                    const seriesId = row.original.id;
                    return <DatasetSeriesActions series={seriesId} onActionClick={onActionClick} />;
                },
            },
        ],
        [onActionClick]
    );

    return (
        <Table
            columns={columns}
            data={data ?? []}
            headerColor={Colors.white}
            headerTextSize="xs"
            className="text-xs bg-gray-100"
        />
    );
};

export default DatasetSeriesTable;
