import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import DeleteButton from "../../ui/DeleteButton";

//TODO: Importer le type Series
interface ImportTableSeriesProps {
    data: Series[];
}

const ImportTableSeries: React.FC<ImportTableSeriesProps> = ({ data = [] }) => {
    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "mainDicomTags.seriesDescription",
                header: "Series Description",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.modality",
                header: "Modality",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.seriesNumber",
                header: "Series NUmber",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorFn: ({row})=> row.instances.length,
                header: "Number Of Instances",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            }
        ];
    }, []);

    return (
        <Table
            columns={columns}
            data={rows}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
        />
    );
};

export default ImportTableSeries;
