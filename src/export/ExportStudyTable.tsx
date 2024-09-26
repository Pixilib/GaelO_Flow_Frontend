import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";

import { Table, Button } from "../ui";
import { Colors, Study } from "../utils";

type ExportStudyTableProps = {
    studies: Study[];
};

const ExportStudyTable = ({ studies }: ExportStudyTableProps) => {
    const dispatch = useDispatch();

    const handleDelete = (studyId: string) => {
    };

    const columns: ColumnDef<Study>[] = useMemo(
        () => [
            {
                id: "id",
                accessorKey: "id",
                header: "ID",
            },
            {
                accessorKey: "patientMainDicomTags.patientName",
                header: "Patient Name",
            },
            {
                accessorKey: "patientMainDicomTags.patientId",
                header: "Patient ID",
            },
            {
                accessorKey: "mainDicomTags.accessionNumber",
                header: "Accession Number",
            },
            {
                accessorKey: "mainDicomTags.studyDate",
                header: "Acquisition Date",
            },
            {
                accessorKey: "mainDicomTags.studyDescription",
                header: "Study Description",
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex justify-center">
                        <Button
                            onClick={() => handleDelete(row.original.id)}
                            color={Colors.danger}
                        >
                            Remove
                        </Button>
                    </div>
                ),
            },
        ],
        [dispatch]
    );

    return <Table data={studies} columns={columns} />;
};

export default ExportStudyTable;
