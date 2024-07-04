import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../ui";
import { Colors } from "../utils";
import RetrieveButton from './RetrieveButton';

type SeriesTableProps = {
    series: any[] | null;
};

const SeriesTable = ({ series }: SeriesTableProps) => {

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "SeriesDescription",
            header: "Series Description",
        },
        {
            accessorKey: "Modality",
            header: "Modality",
        },
        {
            accessorKey: "SeriesNumber",
            header: "Series Number",
        },
        {
            accessorKey: "NumberOfSeriesRelatedInstances",
            header: "Instances",
        },
        {
            header: "Action",
            cell: ({ row }: { row: any }) => {
                return (
                    console.log(row.original),
                    <div className="flex justify-center">
                        <RetrieveButton
                            answerId={row.original.AnswerId}
                            answerNumber={row.original.AnswerNumber}
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
            headerColor={Colors.almond}
            headerTextSize="xs"
            className="text-xs"
        />
    );

}
export default SeriesTable;