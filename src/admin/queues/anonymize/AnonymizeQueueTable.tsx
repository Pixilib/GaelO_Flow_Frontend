import { Trash } from "../../../icons"
import { deleteQueryQueue } from "../../../services/queues"
import { Button, Table } from "../../../ui"
import { Colors, useCustomMutation } from "../../../utils"

type AnonymizeQueueTableProps = {
    queues?: any[]
}
const AnonymizeQueueTable = ({ queues = [] }: AnonymizeQueueTableProps) => {

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        ({ queueId }) => deleteQueryQueue(queueId),
        [["queue", "query"]]
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

export default AnonymizeQueueTable