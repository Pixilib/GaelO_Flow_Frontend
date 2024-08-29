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
    selectedStudyId: string | null;
};

const DatasetTableStudy: React.FC<StudyTableProps> = ({
    studies,
    onRowClick,
    onActionClick,
    selectedStudyId,
}) => {

    const data = useMemo(() => {
        return studies.map(study => study.toJSON())
    }, [studies]);

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

    const getRowClasses = (row: any) => {
        const isSelected = row.original.id === selectedStudyId;
        return isSelected
            ? 'bg-primary hover:cursor-pointer'
            : 'hover:bg-indigo-100 hover:cursor-pointer';
    };


    return (
        <Table
            columns={columns}
            data={data}
            enableColumnFilters={true}
            headerColor={Colors.white}
            onRowClick={(row) => onRowClick(row.id)}
            enableSorting={true}
            enableRowSelection={true}
            headerTextSize='xs'
            className="text-xs bg-gray-100"
            getRowClasses={getRowClasses} 
        />
    );
};

export default DatasetTableStudy;
