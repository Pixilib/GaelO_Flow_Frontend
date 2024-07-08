import React, { useMemo, useState } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import Study from "../../model/Study";

interface ImportTableStudyProps {
    data: Study[];
    onStudyClick: (studyInstanceUID: string) => void;
    studyInstanceUID: string | null;
}

const CreateTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], onStudyClick, studyInstanceUID }) => {
    const [selectedStudy, setSelectedStudy] = useState<string | null>(null);

    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patient.patientId",
                header: "Patient ID",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "patient.patientName",
                header: "Patient Name",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "studyDescription",
                header: "Study Description",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "studyDate",
                header: "Study Date",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "accessionNumber",
                header: "Accession Number",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            }
        ];
    }, []);

    const getRowClasses = (row: Study) => {
        if (row.studyInstanceUID === selectedStudy) {
            return 'bg-primary hover:cursor-pointer'; 
        } else {
            return 'hover:bg-indigo-100 hover:cursor-pointer';
        }
    };

    const handleRowClick = (study: Study) => {
        if (study.studyInstanceUID !== undefined) {
            setSelectedStudy(study.studyInstanceUID);
            onStudyClick(study.studyInstanceUID);
        }
    };

    return (
        <Table
            columns={columns}
            data={rows}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
            headerTextSize="xs"
            getRowClasses={getRowClasses}
            onRowClick={handleRowClick}
        />
    );
};

export default CreateTableStudy;
