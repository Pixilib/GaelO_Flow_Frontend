import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Table } from "../ui";
import { AnonPatient } from "../utils/types";
import { Colors } from "../utils";
import { Trash } from "../icons";

type PatientTableProps = {
    patients: AnonPatient[];
    selectedRows?: Record<string, boolean>;
    onClickRow: (patientId :string) => void;
    onRemovePatient: (patientId: string) => void;
    onChangePatient: (patientId: string | number, columnId: any, value: any) => void;
    onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void;
};

const PatientTable = ({
    patients,
    selectedRows,
    onClickRow,
    onRemovePatient,
    onChangePatient,
    onRowSelectionChange,
}: PatientTableProps) => {
    console.log(patients)
    const columns: ColumnDef<AnonPatient>[] = useMemo(() => [
        {
            id: "id",
            accessorKey: "id"
        },
        {
            accessorKey: "originalPatient.mainDicomTags.patientId",
            header: "Patient ID",
        },
        {
            accessorKey: "originalPatient.mainDicomTags.patientName",
            header: "Patient Name",
        },
        {
            id: "newPatientId",
            accessorKey: "newPatientId",
            header: "New Patient ID",
            isEditable: true
        },
        {
            id: "newPatientName",
            accessorKey: "newPatientName",
            header: "New Patient Name",
            isEditable: true
        },
        {
            header: "remove",
            cell: ({ row }) => {
                return (
                    <Button color={Colors.danger} onClick={() => onRemovePatient(row.original.originalPatient.id)}>
                        <Trash />
                    </Button>
                );
            },
        },
    ], [onRemovePatient]);

    const getRowClasses = (row: AnonPatient) => {
        if (selectedRows?.[row.originalPatient.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer';
        }
    };

    return (
        <Table
            id="id"
            columns={columns}
            data={patients}
            headerTextSize="xs"
            className="text-xs bg-gray-100"
            columnVisibility={{ id: false }}
            onRowClick={(row) => onClickRow(row.originalPatient.id)}
            onCellEdit={onChangePatient}
            getRowClasses={getRowClasses}
            selectedRow={selectedRows}
            onRowSelectionChange={onRowSelectionChange}
            getRowId={(row) => row.originalPatient.id}
        />
    );
};

export default PatientTable;
