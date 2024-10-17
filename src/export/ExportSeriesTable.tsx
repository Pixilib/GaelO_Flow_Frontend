import { ColumnDef } from "@tanstack/react-table";
import { Button, Table } from "../ui";
import { Colors, Series } from "../utils";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { removeSeriesFromExportList } from "../reducers/ExportSlice";
import { Trash } from "../icons";

type ExportSeriesTableProps = {
    series: Series[];
    selectedRows?: Record<string, boolean>;
};

const ExportSeriesTable = ({ series, selectedRows }: ExportSeriesTableProps) => {
    const dispatch = useDispatch();

    const handleDelete = (seriesId: string) => {
        dispatch(removeSeriesFromExportList({ seriesId }));
    };

    const columns: ColumnDef<Series>[] = useMemo(
        () => [
            {
                id: "id",
                accessorKey: "id",
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
                accessorFn: (row) => row.instances.length,
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
                            <Trash />
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const getRowClasses = (row: Series) => {
        if (selectedRows?.[row.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer';
        }
    };

    return (
        <Table
            data={series}
            columnVisibility={{ id: false }}
            columns={columns}
            className="bg-gray-100"
            getRowClasses={getRowClasses}
        />
    );
};

export default ExportSeriesTable;
