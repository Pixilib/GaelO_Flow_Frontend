import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Study, Colors } from "../utils";
import { Table } from "../ui";

type AnonymizeResultTableProps = {
    studies: Study[];
};

const AnonymizeResultTable: React.FC<AnonymizeResultTableProps> = ({
    studies,
}) => {
    const columns: ColumnDef<Study>[] = [
        {
            accessorKey: "patientMainDicomTags.patientName",
            header: "Accession Number",
        },
        {
            accessorKey: "patientMainDicomTags.patientId",
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

    ]

    return (
        <Table
            columns={columns}
            data={studies}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="text-xs"
            enableSorting={true}
        />
    );
};

export default AnonymizeResultTable;
