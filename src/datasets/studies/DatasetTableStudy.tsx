import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Colors } from "../../utils";
import { Table } from "../../ui";
import DatasetStudyActions from "./DatasetStudyActions";
import Study from "../../model/Study";

type StudyTableProps = {
  studies: Study[];
  onRowClick: (studyId: string) => void;
  onActionClick: (action: string, studyId: string) => void;
  selectedStudyId: string | null;
  onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void;
  selectedRow?: Record<string, boolean>;
};

const DatasetTableStudy: React.FC<StudyTableProps> = ({
  studies,
  onRowClick,
  onActionClick,
  selectedStudyId,
  onRowSelectionChange,
  selectedRow
}) => {
  const columns: ColumnDef<Study>[] = useMemo(
    () => [
      {
        id: "id",
      },
      {
        accessorKey: "patient.patientId",
        header: "Patient ID",
      },
      {
        accessorKey: "patient.patientName",
        header: "Patient Name",
      },
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
          return (
            <DatasetStudyActions study={study} onActionClick={onActionClick} />
          );
        },
      },
    ],
    [onActionClick]
  );

  const getRowClasses = (study: Study) => {
    const isSelected = study.id === selectedStudyId;
    return isSelected
      ? "bg-primary hover:cursor-pointer text-white font-bold"
      : "hover:bg-indigo-100 hover:cursor-pointer";
  };

  return (
    <Table
      columns={columns}
      data={studies}
      enableColumnFilters={true}
      headerColor={Colors.white}
      onRowClick={(row) => onRowClick(row.id)}
      enableSorting={true}
      enableRowSelection={true}
      headerTextSize="xs"
      className="text-xs bg-gray-100"
      getRowClasses={getRowClasses}
      onRowSelectionChange={onRowSelectionChange}
      selectedRow={selectedRow}
    />
  );
};

export default DatasetTableStudy;
