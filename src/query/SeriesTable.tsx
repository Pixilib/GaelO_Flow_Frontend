import { useMemo } from "react";

import { Table } from "../ui";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';
import { QueryResultSeries } from "../utils/types";

type SeriesTableProps = {
    series: QueryResultSeries[];
};

const SeriesTable = ({ series }: SeriesTableProps) => {
    const columns = [
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
            accessorKey: "numberOfSeriesRelatedInstances",
            header: "Instances",
        },
        {
            header: "Retrieve",
            cell: ({ row }: { row: any }) => {
                return (
                    <div data-gaelo-flow="query-dowload-series" className="flex justify-center">
                        <RetrieveButton
                            answerId={row.original.answerId}
                            answerNumber={row.original.answerNumber}
                        />
                    </div>
                )
            }
        }
    ];

    return (
        <Table
            columns={columns}
            data={series ?? []}
            headerTextSize="xs"
            headerColor={Colors.light} 
            className="text-xs bg-gray-100"
        />
    );

}
export default SeriesTable;