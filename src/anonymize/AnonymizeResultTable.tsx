import React, { useState } from "react";
import Papa from "papaparse";
import { ColumnDef } from "@tanstack/react-table";
import { Study, Colors } from "../utils";
import { Button, Card, CardBody, CardFooter, CardHeader, Table } from "../ui";
import { getStudy } from "../services/orthanc";

import { exportCsv } from "../utils/export";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Anon, Export, Trash } from "../icons";
import { addSeriesOfStudyIdToExportList, addStudyIdToDeleteList } from "../utils/actionsUtils";
import { useTranslation } from "react-i18next";


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

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({});
  const {t} = useTranslation()

  const role = useSelector((state: RootState) => state.user.role);

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

  const handleSendExportList = () => {
    Object.entries(selectedRows).forEach(async ([studyId, isSelected]) => {
      await addSeriesOfStudyIdToExportList(studyId);
    })
  };

  const handleSendDeleteList = () => {
    Object.entries(selectedRows).forEach(async ([studyId, isSelected]) => {
      await addStudyIdToDeleteList(studyId);
    })
  };

  return (
    <Card>
      <CardHeader className="flex justify-center" color={Colors.primary}>
        <span className="text-lg font-bold text-center">Results</span>
      </CardHeader>
      <CardBody color={Colors.almond}>
        <div className="flex flex-col gap-3">
          <Table
            enableRowSelection
            selectedRow={selectedRows}
            onRowSelectionChange={setSelectedRows}
            columns={columns}
            data={studies}
            headerColor={Colors.light}
            headerTextSize="xs"
            className="text-xs"
            enableSorting={true}
          />
          <div className="flex flex-row gap-3">
            {role.export &&
              <Button
                color={Colors.secondary}
                className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                onClick={handleSendExportList}
              >
                <Export className="text-xl" />
                <span className="ml-2">{t("buttons.Send to Export")}</span>
              </Button>
            }
            {role.delete &&
              <Button
                color={Colors.danger}
                className="flex items-center text-sm transition-transform duration-200 hover:scale-105"
                onClick={handleSendDeleteList}
              >
                <Trash className="text-xl" />
                <span className="ml-2">{t("buttons.Send to Delete")}</span>
              </Button>
            }
          </div>
        </div>
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
