import { Colors } from "../utils";
import { cancelCdBurnerJob } from "../services/cd-burner";
import { Button, Table } from "../ui";
import { Trash } from "../icons";

const CdBurnerJobTable = ({ data }) => {

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
            cell: ({ row }) => (
                ['BURNING_DONE', 'BURNING_ERROR'].includes(row.original.jobStatus) ? <div className="h-10" /> :
                    <Button color={Colors.danger} onClick={() => cancelCdBurnerJob(row.original.jobID)}> <Trash /></Button>
            ),
        },
    ];

    return (
        <Table
            columns={columns}
            data={data}
            enableSorting
            initialSorting={[{ id: "timestamp", desc: true, }]}
        />
    );
};

export default CdBurnerJobTable;