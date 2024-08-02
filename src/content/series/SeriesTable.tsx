import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";


import { Table } from "../../ui";
import { Colors, Series as SeriesType } from "../../utils";
import SeriesActions from "./SeriesActions";

type SeriesTableProps = {
    series: SeriesType[];
    onActionClick: (action: string, series: SeriesType) => void;
};
const SeriesTable = ({ series, onActionClick }: SeriesTableProps) => {
    
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