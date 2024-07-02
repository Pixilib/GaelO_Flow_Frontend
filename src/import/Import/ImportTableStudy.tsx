import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import Study from "../../model/Study";

interface ImportTableStudyProps {
    data: Study[];
    onStudyClick: (studyInstanceUID: string) => void
    studyInstanceUID: string | null
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], onStudyClick, studyInstanceUID }) => {
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


    const getRowClasses = (row: any) => {
        if (row.original.studyInstanceUID === studyInstanceUID) {
            return 'bg-red-500 text-white'
        } else {
            return undefined
        }
    }

    return (
        <Table
            onRowClick={(study: Study) => {
                if (study.studyInstanceUID) onStudyClick(study.studyInstanceUID)
            }}
            columns={columns}
            data={rows}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
            headerTextSize="xs"
            getRowClasses={getRowClasses}
        />
    );
};

export default ImportTableStudy;
