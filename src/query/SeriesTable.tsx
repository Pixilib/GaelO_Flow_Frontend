import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../ui";
import { Colors } from "../utils";

type SeriesTableProps = {
    series: any[] | null;
};

const SeriesTable = ({ series }:SeriesTableProps) => {

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
            accessorKey: "InstanceCount",
            header: "Instances",
        },
    ];

    return (
        <Table
            columns={columns}
            data={series ?? []}
            headerColor={Colors.almond}
            headerTextSize="xs"
        />
    );
    
}
export default SeriesTable;