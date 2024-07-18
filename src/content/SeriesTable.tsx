import { useMemo } from "react";

import { Table } from "../ui";
import { Colors } from "../utils";
import RetrieveButton from '../query/RetrieveButton';
import { Series } from "../utils/types";

type SeriesTableProps = {
    series: Series[];
};
//TODO: 
const SeriesTable = ({ series }: SeriesTableProps) => {
    
    const mainDicomTags = series.map(s => ({
      ...s.mainDicomTags,
      instancesLength: s.instances?.length ?? 0
    }));
    console.log("Series",mainDicomTags, series);
    const rows = useMemo(() => mainDicomTags, [JSON.stringify(series)]);
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
            accessorKey: "instancesLength",
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