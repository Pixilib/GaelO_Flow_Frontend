import { ColumnDef } from "@tanstack/react-table";
import { Button, Input, Table } from "../ui"
import { useMemo } from "react";
import { Patient } from "../utils/types";
import { Colors } from "../utils";
import { Trash } from "../icons";

type PatientTableProps = {
    patients: Patient[]
    onRemovePatient: (patientId: string) => void
}
const PatientTable = ({ patients, onRemovePatient}: PatientTableProps) => {


    const columns: ColumnDef<Patient>[] = useMemo(() => [
        {
            id : "id",
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
                return <Input />;
            },
        },
        {
            accessorKey: "newPatientName",
            header: "New Patient Name",
            cell: ({ row }) => {
                const patient = row.original;
                return <Input />;
            },
        },
        {
            header: "remove",
            cell: ({ row }) => {
                return <Button color={Colors.danger} onClick={()=>onRemovePatient(row.original.id)}><Trash /></Button>;
            },
        },
    ], []);

    return (
        <Table columns={columns} data={patients} columnVisibility={{ id: false }} />
    )
}

export default PatientTable