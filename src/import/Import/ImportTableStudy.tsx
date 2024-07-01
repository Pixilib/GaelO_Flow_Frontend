import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import { Study } from "../../utils/types";

interface ImportTableStudyProps {
    data: Study[];
    onStudyClick: (studyInstanceUID: string) => void
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [], onStudyClick }) => {
    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patientMainDicomTags.patientID",
                header: "Patient ID",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "patientMainDicomTags.patientName",
                header: "Patient Name",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.studyDescription",
                header: "Study Description",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.studyDate",
                header: "Study Date",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.accessionNumber",
                header: "Accession Number",
                cell: (info: { getValue: () => any; }) => <span>{info.getValue() as string}</span>
            }

        ];
    }, []);

    return (
        <Table
            onRowClick={(study: Study) => onStudyClick(study.mainDicomTags.studyInstanceUID)}
            columns={columns}
            data={rows}
            headerColor={Colors.almond}
            enableColumnFilters
            enableSorting
        />
    );
};

export default ImportTableStudy;
