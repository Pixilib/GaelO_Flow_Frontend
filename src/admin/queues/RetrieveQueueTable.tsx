import { Table } from "../../ui"
import { Colors } from "../../utils"

type RetrieveQueueTableProps = {
    queues? : any[]
}
const RetrieveQueueTable = ({queues = []} : RetrieveQueueTableProps) => {

    const columns = [
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
            accessorFn : (row) => {
                return row.jobs.length
            }
        },
    ]

    return (
        <Table data={queues} columns={columns} headerColor={Colors.almond} />
    )

}

export default RetrieveQueueTable