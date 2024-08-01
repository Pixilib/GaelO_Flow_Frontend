import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";


import { Series } from '../../utils/types';
import { Table } from "../../ui";
import { Colors } from "../../utils";
import { FaEdit, FaTrash } from "react-icons/fa";
import EntityActions from "../EntityAction";

type SeriesTableProps = {
    series: Series[];
    onActionClick: (action: string, series: Series) => void;
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
                console.log("Series data for actions:", JSON.stringify(seriesData, null, 2));
                const options = [
                    {
                        label: 'Modify',
                        icon: <FaEdit />,
                        color: 'orange',
                        action: () => {
                            onActionClick('edit', seriesData);
                        }
                    },
                    {
                        label: 'Delete',
                        icon: <FaTrash />,
                        color: 'red',
                        action: () => {
                            onActionClick('delete', seriesData);
                        }
                    },
                ];
                return <EntityActions entity={seriesData} options={options} />;
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