import { useMemo, useState } from "react";
import { Info } from "../../icons";
import { Badge, Button, Table } from "../../ui";
import { Colors } from "../../utils";
import { Queue } from "../../utils/types";
import { size } from "@floating-ui/dom";

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
                    <div>
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

                const tags = useMemo(() => {
                    return {...row.original.results?.MainDicomTags, ...row.original.results?.PatientMainDicomTags}
                }, [row.original.results])

                return (
                    <div className={`flex flex-row items-center gap-10 overflow-hidden `}>
                        <div>
                            <Button onClick={() => setOpen(open => !open)} color={Colors.primary}><Info /></Button>
                        </div>
                        {open &&
                            <div className=" flex flex-col max-h-24 w-full overflow-auto gap-3 border border-gray-500 rounded-md p-1">
                                {tags && Object.entries(tags).map(([key, value], index) => (
                                    <Badge key={key} className="font-bold break-all">{key} : {value}</Badge>
                                ))}
                            </div>
                        }
                    </div>
                )
            },
            size: 200,
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