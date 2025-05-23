import { Trash } from "../../../icons"
import { deleteDeleteQueue } from "../../../services/queues"
import { Button, Table } from "../../../ui"
import { Colors, useCustomMutation } from "../../../utils"

type DeleteQueueTableProps = {
    queues?: any[]
}
const DeleteQueueTable = ({ queues = [] }: DeleteQueueTableProps) => {

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        ({ queueId }) => deleteDeleteQueue(queueId),
        [["queue", "delete"]]
    );

    const handleDelete = (queueId: string) => {
        mutateDeleteQueue({ queueId })
    }

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "userId",
            header: "User ID",
        },
        {
            accessorKey: "progress",
            header: "Progress",
        },
        {
            accessorKey: "numberOfJobs",
            header: "Number of items",
            accessorFn: (row) => {
                return row.jobs.length
            }
        },
        {
            id: "delete",
            header: 'Delete',
            cell: ({ row }) => {
                return <Button color={Colors.danger} onClick={() => { handleDelete(row.id) }}><Trash /></Button>
            }
        }
    ]

    return (
        <Table columnVisibility={{ id: false }} data={queues} columns={columns} headerColor={Colors.success} headerclassName="text-white" />
    )

}

export default DeleteQueueTable