import { useMemo, useState } from "react";
import { Info } from "../../icons";
import { Badge, Button, Table } from "../../ui";
import { Colors } from "../../utils";
import { Queue } from "../../utils/types";
import { useTranslation } from "react-i18next";

type TaskTableProps = {
    data: Queue[];
    selectedRows?: Record<string, boolean>;
    onRowSelectionChange?: (rowSelection: Record<string, boolean>) => void;
}

const TaskTable = ({ data, selectedRows, onRowSelectionChange }: TaskTableProps) => {
    const {t} = useTranslation()

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
                if( row.original.query === undefined ) return <div> Pending </div>
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
            header: t("auto-retrieve.task.state"), 
        },
        {
            id: "progress",
            accessorKey: "progress",
            header: t("auto-retrieve.task.progress"),
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