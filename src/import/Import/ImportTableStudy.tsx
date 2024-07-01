import React, { useMemo } from "react";
import { Table } from "../../ui";
import { Colors } from "../../utils/enums";
import Study from "../../model/Study";

interface ImportTableStudyProps {
    data: Study[];
    onStudyClick: (studyInstanceUID: string) => void
}

const ImportTableStudy: React.FC<ImportTableStudyProps> = ({ data = [] }) => {
    const rows = useMemo(() => data, [data]);

    const columns = useMemo(() => {
        return [
            {
                accessorKey: "patientMainDicomTags.patientID",
                header: "Patient ID",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "patientMainDicomTags.patientName",
                header: "Patient Name",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.studyDescription",
                header: "Study Description",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.studyDate",
                header: "Study Date",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            },
            {
                accessorKey: "mainDicomTags.accessionNumber",
                header: "Accession Number",
                cell: (info: { getValue: () => string; }) => <span>{info.getValue() as string}</span>
            }

        ];
    }, []);

    return (
<div></div>
    );
};

export default ImportTableStudy;
