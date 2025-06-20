import React, { useContext } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Table } from "../../../ui";
import { Colors } from "../../../utils";
import { GaeloIcon } from "../../../assets";
import { getGaelOPatientLink } from "../../../services/gaelo";
import GaelOContext from "../context/GaelOContext";

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
    const { studyName, role, token, userId } = useContext(GaelOContext);

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
        {
            id: "open",
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <Button
                        className="h-10 w-45 text-sm"
                        color={Colors.warning}
                        onClick={() => handleOpenPatientInGaelO(row.original.id)}
                        children={
                            <div className="flex items-center gap-1">
                                <p>Open patient in </p>
                                <div className="mb-0.5"><GaeloIcon /></div>
                            </div>
                        }
                    />
                </div>

            )
        },
    ];

    const handleOpenPatientInGaelO = (patientId: string) => {
        window.open(getGaelOPatientLink(studyName, role, patientId, token, userId));
    }

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
