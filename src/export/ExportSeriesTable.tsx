import { ColumnDef } from "@tanstack/react-table";
import { Button, Table } from "../ui"
import { Colors, Series } from "../utils";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { removeSeriesFromExportList } from "../reducers/ExportSlice";

type ExportSeriesTableProps = {
    series: Series[]
}
const ExportSeriesTable = ({ series }: ExportSeriesTableProps) => {
    const dispatch = useDispatch()

    const handleDelete = (seriesId: string) => {
        dispatch(removeSeriesFromExportList({seriesId : seriesId}))
    };

    const columns: ColumnDef<Series>[] = useMemo(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "mainDicomTags.seriesDescription",
                header: "Series Description",
            },
            {
                accessorKey: "mainDicomTags.modality",
                header: "Modality",
            },
            {
                accessorKey: "mainDicomTags.seriesNumber",
                header: "Series Number",
            },
            {
                accessorFn: (row) =>  row.instances.length,
                header: "Instances",
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <Button
                            onClick={() => handleDelete(row.original.id)}
                            color={Colors.danger}
                        >
                            Remove
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    return (
        <Table data={series} columns={columns} />
    )
}

export default ExportSeriesTable