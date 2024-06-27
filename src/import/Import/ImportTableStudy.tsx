import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import DeleteButton from "../../ui/DeleteButton";

interface Patient {
    id: string;
    patientId: string;
}

interface ImportTableStudyProps {
    data: Patient[];
    onDelete: (id: string) => void;
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], onDelete }) => {
    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patientId",
                header: "Patient ID",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                header: "Actions",
                id: "actions",
                cell: (info: { row: { original: Patient } }) => (
                    <DeleteButton
                        className="px-2 py-1 text-white bg-red-500 rounded"
                        onClick={() => onDelete(info.row.original.id)}
                    />
                ),
            },
        ];
    }, [onDelete]);

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
