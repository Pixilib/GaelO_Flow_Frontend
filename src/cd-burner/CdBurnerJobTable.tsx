import { Colors, useCustomToast } from "../utils";
import { cancelCdBurnerJob } from "../services/cd-burner";
import { Button, Table } from "../ui";
import { Trash } from "../icons";

const CdBurnerJobTable = ({ data, ...props }) => {
    const { toastSuccess, toastError } = useCustomToast();

    const handleDeleteJob = async (jobId: string) => {
        cancelCdBurnerJob(jobId).then(() => {
            toastSuccess("CD Burner job canceled");
        }).catch((e) => {
            toastError("Failed to cancel CD Burner job, is it already canceled?");
        });
    }

    const columns = [
        {
            accessorKey: "jobID",
            header: "Job ID",
        },
        {
            accessorKey: "patientName",
            header: "Patient Name",
        },
        {
            accessorKey: "timestamp",
            header: "Request Time",
            cell: ({ row }) => {
                const date = new Date(row.original.timestamp);
                return date.toLocaleString();
            }
        },
        {
            accessorKey: "level",
            header: "Level",
        },
        {
            accessorKey: "jobStatus",
            header: "Status",
        },
        {
            accessorKey: "cancelButton",
            header: "Cancel",
            enableSorting: false,
            cell: ({ row }) => {
                const canBeCanceled = !['BURNING_DONE', 'BURNING_ERROR', 'REQUEST_CANCELING'].includes(row.original.jobStatus);
                return <Button
                    color={canBeCanceled ? Colors.danger : Colors.dark}
                    onClick={() => handleDeleteJob(row.original.jobID)}
                    title="Cancel CD Burner Job"
                    disabled={!canBeCanceled}
                >
                    <Trash />
                </Button>
            }
        },
    ];

    return (
        <>
            <div {...props}>
                <Table
                    columns={columns}
                    data={data}
                    enableSorting
                    initialSorting={[{ id: "timestamp", desc: true, }]}
                />
            </div>
        </>
    );
};

export default CdBurnerJobTable;