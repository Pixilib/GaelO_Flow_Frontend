import { ColumnDef } from "@tanstack/react-table";
import { Button, Input, Table } from "../ui"
import { useMemo } from "react";
import { Patient } from "../utils/types";
import { Colors } from "../utils";
import { Trash } from "../icons";

type PatientTableProps = {
    patients: Patient[]
    onClickRow: (patient: Patient) => void;
    onRemovePatient: (patientId: string) => void
    onCellEdit: (patientId: string | number, columnId: any, value: any) => void
}
const PatientTable = ({ patients, onClickRow, onRemovePatient, onCellEdit }: PatientTableProps) => {


    const columns: ColumnDef<Patient>[] = useMemo(() => [
        {
            id: "id",
            accessorKey: "id"
        },
        {
            accessorKey: "mainDicomTags.patientId",
            header: "Patient ID",
        },
        {
            accessorKey: "mainDicomTags.patientName",
            header: "Patient Name",
        },
        {
            id: "newPatientId",
            header: "New Patient ID",
            isEditable: true
        },
        {
            id: "newPatientName",
            header: "New Patient Name",
            isEditable: true
        },
        {
            header: "remove",
            cell: ({ row }) => {
                return <Button color={Colors.danger} onClick={() => onRemovePatient(row.original.id)}><Trash /></Button>;
            },
        },
    ], []);

    return (
        <Table id={'id'} columns={columns} onRowClick={onClickRow} data={patients} columnVisibility={{ id: false }} onCellEdit={onCellEdit} />
    )
}

export default PatientTable