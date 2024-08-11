import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import Study from "../../model/Study";

interface ImportTableStudyProps {
    data: Study[];
    onStudyClick: (studyInstanceUID: string) => void;
    selectedStudyInstanceUID: string | null;
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], onStudyClick, selectedStudyInstanceUID }) => {
    const rows = useMemo(() => data, [data]);
    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patient.patientId",
                header: "Patient ID"
            },
            {
                accessorKey: "patient.patientName",
                header: "Patient Name"
            },
            {
                accessorKey: "studyDescription",
                header: "Study Description"
            },
            {
                accessorKey: "studyDate",
                header: "Study Date"
            },
            {
                accessorKey: "accessionNumber",
                header: "Accession Number"
            }
        ];
    }, []);

    const getRowClasses = (row: Study) => {
        if (row.studyInstanceUID === selectedStudyInstanceUID) {
            return 'bg-primary hover:cursor-pointer';
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer';
        }
    };

    const handleRowClick = (study: Study) => {
        if (study.studyInstanceUID !== undefined) {
            onStudyClick(study.studyInstanceUID);
        }
    };

    return (
        <Table
            columns={columns}
            data={rows}
            headerTextSize='xs'
            headerColor={Colors.white}
            className="bg-gray-100"
            enableColumnFilters
            enableSorting
            getRowClasses={getRowClasses}
            onRowClick={handleRowClick}
        />
    );
};

export default ImportTableStudy;
