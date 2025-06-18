import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../ui";
import { Colors } from "../../../utils";

type PatientTableProps = {
    patients: any[];
    patientId: string,
    onRowClick: (patientId: string) => void;
};

const PatientTable: React.FC<PatientTableProps> = ({
    patients,
    patientId,
    onRowClick
}) => {
    const columns: ColumnDef<any>[] = [
        {
            id: "id",
            accessorKey: "id",
        },
        {
            id: "code",
            accessorKey: "code",
            header: "Code",
        },
        {
            id: "centerName",
            accessorKey: "center.name",
            header: "Center Name",
        },
    ];


    const getRowClasses = (row: any) => {
        if (patientId === row.id) {
            return 'bg-primary hover:cursor-pointer text-white';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer dark:hover:bg-indigo-700';
        }
    };

    return (
        <Table
            columns={columns}
            data={patients}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="bg-gray-100 dark:bg-slate-950 dark:text-white w-full"
            getRowClasses={getRowClasses}
            onRowClick={(row) => onRowClick(row.id)}
            enableSorting={true}
            enableColumnFilters={true}
            columnVisibility={{ id: false }}
            pageSize={5}
        />
    );
};

export default PatientTable;
