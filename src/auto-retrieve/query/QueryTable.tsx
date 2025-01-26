import moment from "moment";
import { Table } from "../../ui";
import { QueryStudy } from "../types";
import { Option } from "../../utils";

type QueryTableProps = {
  aets: Option[];
  queries: QueryStudy[];
  onCellEdit: (rowIndex: string | number, columnId: any, value: any) => void;
  onRowSelectionChange: (selectedState: Record<number, boolean>) => void;
  selectedRow: Record<number, boolean>;
};

const QueryTable = ({ aets, queries, onCellEdit, onRowSelectionChange, selectedRow }: QueryTableProps) => {
  const columns = [
    {
      id: "id",
      accessorKey: "id",
    },
    {
      id: "patientName",
      accessorKey: "patientName",
      header: "Patient Name",
      isEditable: true,
      style: {
        minWidth: '150px'
      }
    },
    {
      id: "patientID",
      accessorKey: "patientID",
      header: "Patient ID",
      isEditable: true,
      style: {
        minWidth: '150px'
      }
    },
    {
      id: "studyDescription",
      accessorKey: "studyDescription",
      header: "Study Description",
      isEditable: true,
      style: {
        minWidth: '150px'
      }
    },
    {
      id: "accessionNumber",
      accessorKey: "accessionNumber",
      header: "Accession Number",
      isEditable: true,
      style: {
        minWidth: '100px'
      }
    },
    {
      id: "dateFrom",
      accessorKey: "dateFrom",
      header: "Date From",
      isEditable: true,
      style: {
        minWidth: '100px'
      }
    },
    {
      id: "dateTo",
      accessorKey: "dateTo",
      header: "Date To",
      isEditable: true,
      style: {
        minWidth: '100px'
      }
    },
    {
      id: "modalitiesInStudy",
      accessorKey: "modalitiesInStudy",
      header: "Modalities",
      isEditable: true,
      style: {
        minWidth: '100px'
      }
    },
    {
      id: "aet",
      accessorKey: "aet",
      header: "AET",
      isEditable: true,
      editionProperties: {
        type: 'SELECT',
        options: aets
      },
      style: {
        minWidth: '150px'
      }
    },
  ];

  return (
    <Table
      enableRowSelection
      enableColumnFilters
      enableSorting
      onCellEdit={onCellEdit}
      columns={columns}
      columnVisibility={{ id: false }}
      data={queries}
      onRowSelectionChange={onRowSelectionChange}
      selectedRow={selectedRow}
    />
  );
};

export default QueryTable;
