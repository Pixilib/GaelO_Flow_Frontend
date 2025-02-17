import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { Table, Button } from "../ui";
import { Colors, Study } from "../utils";
import { removeSeriesFromExportList } from "../reducers/ExportSlice";
import { Trash } from "../icons";

type ExportStudyTableProps = {
  studies: Study[];
  currentStudyId: string;
  onClickStudy: (study: Study) => void;
};

const ExportStudyTable = ({
  studies,
  currentStudyId,
  onClickStudy,
}: ExportStudyTableProps) => {
  const dispatch = useDispatch();

  const handleDelete = (studyId: string) => {
    const studyToDelete = studies.find((study) => study.id === studyId);
    for (const seriesId of studyToDelete.series) {
      dispatch(removeSeriesFromExportList({ seriesId }));
    }
  };

  const columns: ColumnDef<Study>[] = useMemo(
    () => [
      {
        id: "id",
        accessorKey: "id",
      },
      {
        accessorKey: "patientMainDicomTags.patientName",
        header: "Patient Name",
      },
      {
        accessorKey: "patientMainDicomTags.patientId",
        header: "Patient ID",
      },
      {
        accessorKey: "mainDicomTags.accessionNumber",
        header: "Accession Number",
      },
      {
        accessorKey: "mainDicomTags.studyDate",
        header: "Acquisition Date",
      },
      {
        accessorKey: "mainDicomTags.studyDescription",
        header: "Study Description",
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center">
            <Button
              onClick={() => handleDelete(row.original.id)}
              color={Colors.danger}
            >
              <Trash />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const getRowClasses = (row: Study) => {
    if (currentStudyId === row.id) {
      return "bg-primary text-white font-bold hover:cursor-pointer";
    } else {
      return "hover:bg-indigo-100 hover:cursor-pointer";
    }
  };

  return (
    <Table
      onRowClick={onClickStudy}
      columnVisibility={{ id: false }}
      data={studies}
      headerTextSize="xs"
      className="text-sm break-words bg-gray-100"
      columns={columns}
      getRowClasses={getRowClasses}
    />
  );
};

export default ExportStudyTable;
