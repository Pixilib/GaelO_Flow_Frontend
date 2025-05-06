import React from "react";
import Papa from "papaparse";
import { ColumnDef } from "@tanstack/react-table";
import { Study, Colors } from "../utils";
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from "../ui";
import { getStudy } from "../services/orthanc";

import { exportCsv } from "../utils/export";

type AnonymizeResultTableProps = {
  studies: Study[];
};

const AnonymizeResultTable: React.FC<AnonymizeResultTableProps> = ({
  studies,
}) => {
  const columns: ColumnDef<Study>[] = [
    {
      accessorKey: "patientMainDicomTags.patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "patientMainDicomTags.patientId",
      header: "Patient ID",
    },
    {
      accessorKey: "mainDicomTags.studyDate",
      header: "Acquisition Date",
    },
    {
      accessorKey: "mainDicomTags.studyDescription",
      header: "Study Description",
    },
  ];

  const handleExportResultsCSV = async () => {
    const records = [];
    for (const study of studies) {
      const originalStudyId = study.anonymizedFrom;
      const originalStudy = await getStudy(originalStudyId);
      records.push({
        originalPatientName: originalStudy.patientMainDicomTags.patientName,
        originalPatientId: originalStudy.patientMainDicomTags.patientId,
        originalStudyInstanceUID: originalStudy.mainDicomTags.studyInstanceUID,
        originalStudyDescription: originalStudy.mainDicomTags.studyDescription,
        originalStudyId: originalStudy.id,
        newPatientName: study.patientMainDicomTags.patientName,
        newPatientId: study.patientMainDicomTags.patientId,
        newStudyInstanceUID: study.mainDicomTags.studyInstanceUID,
        newStudyDescription: study.mainDicomTags.studyDescription,
        newStudyId: study.id,
      });
    }
    exportCsv(Papa.unparse(records), ".csv", "anon-results.csv");
  };

  return (
    <Card>
      <CardHeader className="flex justify-center" color={Colors.primary}>
        <span className="text-lg font-bold text-center">Results</span>
      </CardHeader>
      <CardBody color={Colors.almond}>
        <Table
          columns={columns}
          data={studies}
          headerColor={Colors.light}
          headerTextSize="xs"
          className="text-xs"
          enableSorting={true}
        />
      </CardBody>
      <CardFooter color={Colors.white} className="flex justify-center">
        <Button color={Colors.warning} onClick={handleExportResultsCSV}>
          Export CSV
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnonymizeResultTable;
