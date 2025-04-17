import React from "react"
import { Info } from "../../../icons"
import { deleteProcessingjob } from "../../../services/queues"
import { Badge, Button, Table } from "../../../ui"
import { Colors, useCustomMutation } from "../../../utils"

type ProcessingQueueTableProps = {
    jobs?: any[]
}
const ProcessingQueueTable = ({ jobs = [] }: ProcessingQueueTableProps) => {

    const { mutate: mutateProcessingQueue } = useCustomMutation(
        ({ queueId }) => deleteProcessingjob(queueId),
        [["queue", "query"]]
    );

    const handleProcessing = (queueId: string) => {
        mutateProcessingQueue({ queueId })
    }

    const badgeVariant = (state: string) => {
        switch (state) {
            case "completed":
                return "success";
            case "failed":
                return "danger";
            case "paused":
                return "warning";
        }
        return "default";
    }

    const badgeText = (state: string) => {
        switch (state) {
            case "completed":
                return "Completed";
            case "failed":
                return "Failed";
            case "paused":
                return "Paused";
            case "wait":
                return "Waiting";
            case "active":
                return "Active";
        }
    }

    const columns = [
        {
            accessorKey: "jobId",
            header: "Job ID",
        },
        {
            accessorKey: "progress",
            header: "Progress",
            cell: ({ row }) => {
                return (<p className="font-bold">{row.original.progress + "%"}</p>);
            }
        },
        {
            accessorKey: "payload",
            header: 'Payload',
            cell: ({ row }) => {
                const [isOpen, setIsOpen] = React.useState(false);

                return (
                    <div className="flex flex-row items-center gap-10 overflow-hidden">
                        <Button color={Colors.primary} onClick={() => setIsOpen(!isOpen)}>
                            <Info className="text-white" />
                        </Button>
                        {isOpen && (
                            <div className=" flex flex-col max-h-24 w-full overflow-auto gap-3 border border-gray-500 rounded-md p-1">
                                {Object.entries(row.original.payload).map(([key, value]) => (
                                    <Badge><span className="font-bold">{key}</span> : {String(value)}</Badge>
                                ))}
                            </div>
                        )}
                    </div>
                );
            }
        },
        {
            accessorKey: "state",
            header: 'State',
            cell: ({ row }) => {
                return (
                    <Badge variant={badgeVariant(row.original.state)}>
                        {badgeText(row.original.state)}
                    </Badge>
                );
            }
        },
        {
            accessorKey: "userId",
            header: 'User ID',
        },
        {
            accessorKey: "type",
            header: 'Job Type',
        },
    ]

    return (
        <Table columnVisibility={{ jobId: false }} data={jobs} columns={columns} headerColor={Colors.success} headerclassName="text-white" />
    )

}

export default ProcessingQueueTable