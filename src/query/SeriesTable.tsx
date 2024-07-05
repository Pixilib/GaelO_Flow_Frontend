import { useMemo } from "react";

import { Table } from "../ui";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';

type SeriesTableProps = {
    series: any[] | null;
};

const SeriesTable = ({ series }: SeriesTableProps) => {
    const rows = useMemo(() => series, [series]);
    const columns = useMemo(() => [
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
                    <div className="flex justify-center">
                        <RetrieveButton
                            answerId={row.original.answerId}
                            answerNumber={row.original.answerNumber}
                        />
                    </div>
                )
            }
        }
    ], []);
    return (
        <Table
            columns={columns}
            data={rows ?? []}
            headerColor={Colors.almond}
            headerTextSize="xs"
            className="text-xs"
        />
    );

}
export default SeriesTable;