import React, { useMemo } from "react";

import { ColumnDef } from "@tanstack/react-table";
import { Colors } from "../../utils";

import { Table } from "../../ui";
import StudyActions from "./DatasetStudyActions";
import Study from "../../model/Study";


type StudyTableProps = {
    studies: Study[];
    onRowClick: (studyId: string) => void;
    onActionClick: (action: string, studyId: string) => void;
};

const DatasetTableStudy: React.FC<StudyTableProps> = ({
    studies,
    onRowClick,
    onActionClick,
}) => {

    const data = useMemo(() => {
        return studies.map(study => study.toJSON())
    }, [studies.length])
    
    const columns: ColumnDef<any>[] = useMemo(() => [
        {
            accessorKey: "accessionNumber",
            header: "Accession Number",
        },
        {
            accessorKey: "studyDate",
            header: "Acquisition Date",
        },
        {
            accessorKey: "studyDescription",
            header: "Study Description",
        },
        {
            header: "Actions",
            cell: ({ row }) => {
                const study = row.original;
                return <StudyActions study={study} onActionClick={onActionClick} />;
            },
        },
    ], [onActionClick]);

    return (
        <Table
            columns={columns}
            data={data}
            enableColumnFilters={true}
            headerColor={Colors.white}
            headerTextSize="xxs"
            className="text-xs bg-gray-100"
            onRowClick={(row) => onRowClick(row.id)}
            enableSorting={true}
            enableRowSelection={true}
        />
    );
};

export default DatasetTableStudy;
