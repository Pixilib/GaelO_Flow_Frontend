import { useState } from "react";
import { Info } from "../../icons";
import { Button, Table } from "../../ui";
import { Colors } from "../../utils";
import { Queue } from "../../utils/types";

type TaskTableProps = {
    data: Queue[];
    selectedRows?: Record<string, boolean>;
    onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
}

const TaskTable = ({ data, selectedRows, onRowSelectionChange }: TaskTableProps) => {

    const columns = [
        {
            id: "id",
            accessorKey: "id",
        },
        {
            id: "query",
            accessorKey: "query",
            cell: ({ row }) => {
                const [open, setOpen] = useState(false)
                return (
                    <div >
                        <Button onClick={() => setOpen(open => !open)} color={Colors.primary}><Info /></Button>
                        {open && <pre className="break-all text-xs">
                            {JSON.stringify(row.original.query, null, 2)}
                        </pre>}
                    </div>
                )
            }
        },
        {
            id: "state",
            accessorKey: "state",
        },
        {
            id: "progress",
            accessorKey: "progress",
        },
        {
            id: "results",
            accessorKey: "results",
            cell: ({ row }) => {
                const [open, setOpen] = useState(false)
                return (
                    <div >
                        <Button onClick={() => setOpen(open => !open)} color={Colors.primary}><Info /></Button>
                        {open && <pre className="break-all text-xs">
                            {JSON.stringify({
                                patientMainDicomTags: row.original.results?.PatientMainDicomTags,
                                mainDicomTags: row.original.results?.MainDicomTags,
                            }, null, 2)}
                        </pre>}
                    </div>)
            },
        },

    ]
    return (
        <Table
            columnVisibility={{ id: false }}
            columns={columns}
            data={data}
            enableRowSelection={true}
            onRowSelectionChange={onRowSelectionChange}
            selectedRow={selectedRows}
        />
    )
};

export default TaskTable;