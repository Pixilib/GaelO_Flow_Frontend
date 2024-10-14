import { ColumnDef } from "@tanstack/react-table";
import { Button, Input, Table } from "../ui"
import { useMemo } from "react";
import { Patient } from "../utils/types";
import { Colors } from "../utils";
import { Trash } from "../icons";

type PatientTableProps = {
    patients: Patient[]
    onClickRow : (patient :Patient) => void;
    onChangePatient: (patientId: string, key: 'newPatientId' | 'newPatientName', value: string) => void;
    onRemovePatient: (patientId: string) => void
}
const PatientTable = ({ patients, onClickRow, onChangePatient, onRemovePatient }: PatientTableProps) => {


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
            accessorKey: "newPatientId",
            header: "New Patient ID",
            cell: ({ row }) => {
                const patientId = row.original.id;
                return <Input onChange={(event) => onChangePatient(patientId, "newPatientId", event.target.value)} />;
            },
        },
        {
            accessorKey: "newPatientName",
            header: "New Patient Name",
            cell: ({ row }) => {
                const patientId = row.original.id;
                return <Input onChange={(event) => onChangePatient(patientId, "newPatientName", event.target.value)} />;
            },
        },
        {
            header: "remove",
            cell: ({ row }) => {
                return <Button color={Colors.danger} onClick={() => onRemovePatient(row.original.id)}><Trash /></Button>;
            },
        },
    ], []);

    return (
        <Table columns={columns} onRowClick={onClickRow} data={patients} columnVisibility={{ id: false }} />
    )
}

export default PatientTable