import { Trash } from "../../../icons"
import { deleteDeleteQueue } from "../../../services/queues"
import { Button, Table } from "../../../ui"
import { Colors, useCustomMutation } from "../../../utils"
import { useTranslation } from "react-i18next";

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
    const {t} = useTranslation()

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
        <div data-gaelo-flow="delete-datatable">
        <Table columnVisibility={{ id: false }} data={queues} columns={columns} headerColor={Colors.success} headerclassName="text-white" />
        </div>
    )

}

export default DeleteQueueTable