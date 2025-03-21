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
                header: "Series Description"
            },
            {
                accessorKey: "modality",
                header: "Modality"
            },
            {
                accessorKey: "seriesNumber",
                header: "Series Number"
            },
            {
                accessorFn: (originalRow: any) => originalRow.instances.length,
                header: "Number Of Instances"
            }
        ];
    }, []);

    const getRowClasses = (row: any) => {
        if (row.someCondition) {
            return 'bg-primary text-white';
        } else {
            return 'bg-indigo-100 dark:bg-indigo-700';
        }
    };

    return (
        <Table
            columns={columns}
            data={rows}
            headerTextSize='xs'
            headerColor={Colors.white}
            className="bg-gray-100 dark:bg-slate-950 dark:text-white"
            enableColumnFilters
            enableSorting
            getRowClasses={(row) => getRowClasses(row)}
        />
    );
};

export default ImportTableSeries;
