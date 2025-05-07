import { useState } from "react";
import { Info } from "../../icons";
import { Badge, Button, Table } from "../../ui";
import { Colors } from "../../utils";
import { Queue } from "../../utils/types";

type TaskTableProps = {
    data: Queue[];
    selectedRows?: Record<string, boolean>;
    onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
}

const TaskTable = ({ data, selectedRows, onRowSelectionChange }: TaskTableProps) => {
    const stateBadgeVariants: Record<string, { variant: string; label: string }> = {
        completed: { variant: "success", label: "Completed" },
        failed: { variant: "danger", label: "Failed" },
        paused: { variant: "warning", label: "Paused" },
        wait: { variant: "warning", label: "Waiting" },
        active: { variant: "default", label: "Active" },
    };

    const columns = [
        {
            id: "id",
            accessorKey: "id",
        },
        {
            id: "query",
            accessorKey: "query",
            cell: ({ row }) => {
                if (row.original.query === undefined) return <div> Pending </div>
                return (
                    <div className="flex flex-col max-h-24 overflow-auto no-scrollbar">
                        {Object.entries(row.original.query).filter(([key, value]) => ['PatientID', 'PatientName', 'StudyDescription', 'StudyDate', 'SeriesDescription'].includes(key)).map(([key, value], index) =>
                            <span key={key} className="text-xs break-all">{key} : {value}</span>
                        )}
                    </div>
                )
            }
        },
        {
            id: "details",
            accessorKey: "details",
            cell: ({ row }) => {
                const [open, setOpen] = useState(false)
                return (
                    <div className={`flex flex-row items-center gap-10 overflow-hidden `}>
                        <div>
                            <Button onClick={() => setOpen(open => !open)} color={Colors.primary}><Info /></Button>
                        </div>
                        {open &&
                            <div className=" flex flex-col max-h-24 w-full overflow-auto gap-3 border border-gray-500 rounded-md p-1">
                                {Object.entries(row.original.query).filter(([key, value]) => !['AnswerId', 'AnswerNumber'].includes(key)).map(([key, value], index) =>
                                    <Badge key={key} className="font-bold break-all">{key} : {value}</Badge>
                                )}
                            </div>
                        }
                    </div>
                )
            }
        },
        {
            id: "state",
            accessorKey: "state",
            cell: ({ row }) => {
                return (
                    <>
                        {stateBadgeVariants[row.original.state] ? (
                            <Badge variant={stateBadgeVariants[row.original.state].variant}>
                                {stateBadgeVariants[row.original.state].label}
                            </Badge>
                        ) : (
                            <Badge>{row.original.state}</Badge>
                        )}
                    </>
                );
            }
        },
        {
            id: "progress",
            accessorKey: "progress",
        }

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