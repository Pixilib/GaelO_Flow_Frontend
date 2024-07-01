import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";

interface Patient {
    id: string;
    patientId: string;
}

interface ImportTableStudyProps {
    data: Patient[];
    onDelete: (id: string) => void;
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], }) => {
    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patientId",
                header: "Patient ID",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "patientName",
                header: "Patient Name",
                cell: (info: { row: { original: Patient } }) => (
                    <span>{info.row.original.name}</span>
                ),
            },
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

export default ImportTableStudy;
