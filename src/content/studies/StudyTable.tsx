import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { StudyMainDicomTags } from "../../utils/types";
import { Colors } from "../../utils";
import { Table } from "../../ui";
import StudyActions from "./StudyActions";

type StudyWithId = StudyMainDicomTags & { id: string };

type StudyTableProps = {
  studies: StudyWithId[];
  selectedRows?: Record<string, boolean>;
  currentActiveStudyId: string | null;
  onRowClick?: (studyId: string) => void;
  onActionClick: (action: string, study: StudyMainDicomTags & { id: string }) => void;
  onRowSelectionChange?: (selectedRow: Record<string, boolean>) => void;
};

const StudyTable: React.FC<StudyTableProps> = ({
  studies,
  selectedRows,
  currentActiveStudyId,
  onRowClick,
  onActionClick,
  onRowSelectionChange,
}) => {
  const columns: ColumnDef<StudyWithId>[] = useMemo(
    () => [
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
    ],
    [onActionClick]
  );

  const getRowClasses = (row: StudyWithId) => {
    let classes = [];
    if (row.id === currentActiveStudyId) classes.push("font-bold");
    if (selectedRows?.[row.id]) {
      classes.push(...["bg-primary", "text-white", "hover:cursor-pointer"]);
    } else {
        classes.push(...[
        "hover:bg-indigo-100",
        "hover:cursor-pointer",
        "dark:hover:bg-indigo-700",
      ]);
    }

    return classes.join(' ');
  };

  return (
    <Table
      columns={columns}
      data={studies}
      headerColor={Colors.light}
      headerTextSize="xs"
      className="bg-gray-100 dark:bg-slate-950 dark:text-white"
      getRowClasses={getRowClasses}
      onRowClick={(row) => onRowClick && onRowClick(row.id)}
      enableSorting={true}
      enableRowSelection={true}
      selectedRow={selectedRows}
      onRowSelectionChange={onRowSelectionChange}
    />
  );
};

export default StudyTable;
