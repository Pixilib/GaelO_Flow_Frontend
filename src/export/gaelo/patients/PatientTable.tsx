import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Table } from "../../../ui";
import { Colors } from "../../../utils";

type PatientTableProps = {
    patients: any[];
    onRowClick?: (patientId: string) => void;
};

const PatientTable: React.FC<PatientTableProps> = ({
    patients,
    onRowClick
}) => {
    const columns: ColumnDef<any>[] = [
        {
            id: "lastname",
            accessorKey: "lastname",
            header: "Lastname",
        },
        {
            id: "firstname",
            accessorKey: "firstname",
            header: "Firstname",
        },
        {
            id: "gender",
            accessorKey: "gender",
            header: "gender",
        },
    ];

    /**
    const getRowClasses = (row: any) => {
        if (selectedPai?.[row.id]) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer dark:hover:bg-indigo-700';
        }
    };
     */


    return (
        <Table
            columns={columns}
            data={patients}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="bg-gray-100 dark:bg-slate-950 dark:text-white"
            //getRowClasses={getRowClasses}
            onRowClick={(row) => onRowClick && onRowClick(row.id)}
            enableSorting={true}
        />
    );
};

export default PatientTable;
