import { Trash } from "../../../icons"
import { deleteQueryQueue } from "../../../services/queues"
import { Button, Table } from "../../../ui"
import { Colors, useCustomMutation } from "../../../utils"
import { useTranslation } from "react-i18next";

type RetrieveQueueTableProps = {
    queues?: any[]
}
const RetrieveQueueTable = ({ queues = [] }: RetrieveQueueTableProps) => {

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        ({ queueId }) => deleteQueryQueue(queueId),
        [["queue", "query"]]
    );
    const {t} = useTranslation()


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
            header: t("admin.queues.user-id"), 
        },
        {
            accessorKey: "progress",
            header: t("admin.queues.progress"),
        },
        {
            accessorKey: "numberOfJobs",
            header: t("admin.queues.number-of-items"),
            accessorFn: (row) => {
                return row.jobs.length
            }
        },
        {
            id: "delete",
            header: t("admin.queues.delete"),
            cell: ({ row }) => {
                return <Button color={Colors.danger} onClick={() => { handleDelete(row.id) }}><Trash /></Button>
            }
        }
    ]

    return (
        <Table columnVisibility={{ id: false }} data={queues} columns={columns} headerColor={Colors.success} headerclassName="text-white" />
    )

}

export default RetrieveQueueTable