import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";

//TODO: Importer le type Series
interface ImportTableSeriesProps {
    data: object[];
}

const ImportTableSeries: React.FC<ImportTableSeriesProps> = ({ data = [] }) => {

    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "seriesDescription",
                header: "Series Description",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "modality",
                header: "Modality",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "seriesNumber",
                header: "Series NUmber",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorFn: (originalRow: any) => originalRow.instances.length,
                header: "Number Of Instances",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
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
