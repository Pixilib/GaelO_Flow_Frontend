import { Info } from "../../icons";
import { Button, Dropdown, Popover, Table } from "../../ui";
import { Colors } from "../../utils";
import { Queue } from "../../utils/types";

type TaskTableProps = {
    data: Queue[];
}

const TaskTable = ({ data }: TaskTableProps) => {

    const columns = [
        {
            id: "id",
            accessorKey: "id",
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
                return (<Popover withOnClick popover={
                    <pre className="break-all">
                        {JSON.stringify({
                            patientMainDicomTags: row.original.results?.PatientMainDicomTags,
                            mainDicomTags: row.original.results?.MainDicomTags,
                        })}
                    </pre>
                }>
                    <Button color={Colors.primary}><Info /></Button>
                </Popover>)
            },
        },
    ]
    return (
        <Table columnVisibility={{ id: false}} columns={columns} data={data} />
    )
};

export default TaskTable;