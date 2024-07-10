import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";

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
                header: "Series Number",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorFn: (originalRow: any) => originalRow.instances.length,
                header: "Number Of Instances",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            }
        ];
    }, []);

    const getRowClasses = (row: any) => {
        if (row.someCondition) {
            return 'bg-primary text-white';
        } else {
            return 'bg-indigo-100';
        }
    };

    return (
        <Table
            columns={columns}
            data={rows}
            headerTextSize='xs'
            headerColor={Colors.white}
            className="bg-gray-100"
            enableColumnFilters
            enableSorting
            getRowClasses={(row) => getRowClasses(row)}
        />
    );
};

export default ImportTableSeries;
