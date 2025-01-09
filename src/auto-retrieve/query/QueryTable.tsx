import moment from "moment";
import { Button, Table } from "../../ui";
import { QueryStudy } from "../types";
import { Colors } from "../../utils";
import { Trash } from "../../icons";

type QueryTableProps = {
  queries: QueryStudy[];
  onCellEdit: (rowIndex: string | number, columnId: any, value: any) => void;
  onRemoveRow: (rowId) => void;
};

const QueryTable = ({ queries, onCellEdit, onRemoveRow }: QueryTableProps) => {
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
    },
    {
      id: "patientID",
      accessorKey: "patientID",
      header: "Patient ID",
      isEditable: true,
    },
    {
      id: "studyDescription",
      accessorKey: "studyDescription",
      header: "Study Description",
      isEditable: true,
    },
    {
      id: "accessionNumber",
      accessorKey: "accessionNumber",
      header: "Accession Number",
      isEditable: true,
    },
    {
      id: "dateFrom",
      accessorFn: (row) => {
        if (row.dateFrom == "" || row.dateFrom == null) return null;
        return moment(row.DateFrom, "YYYYMMDD", true)?.toDate();
      },
      header: "Date From",
      isEditable: true,
      //isEditable: true,
      //editionProperties: {
      //    type: 'CALENDAR'
      //},
      //filterType: filter.DATE_FILTER,
      //filterFn: isWithinDateRange
    },
    {
      id: "dateTo",
      accessorFn: (row) => {
        if (row.dateTo == "" || row.dateTo == null) return null;
        return moment(row.DateFrom, "YYYYMMDD", true)?.toDate();
      },
      header: "Date To",
      isEditable: true,
    },

    {
      id: "modalitiesInStudy",
      accessorKey: "modalitiesInStudy",
      header: "Modalities",
      isEditable: true,
      /*
            cell: ({ row, getValue }) => {
                return <SelectModalities
                    previousModalities={getValue()}
                    onChange={(value) => cellEditHandler(row.original.key, 'ModalitiesInStudy', value)}
                />
            }
                */
    },
    {
      id: "aet",
      accessorKey: "aet",
      header: "AET",
      isEditable: true,
      /*
                    cell: ({ row, getValue }) => {
            return <SelectModalities
                previousModalities={getValue()}
                onChange={(value) => cellEditHandler(row.original.key, 'ModalitiesInStudy', value)}
            />
        }
            */
    },
    {
      accessorKey: "delete",
      header: "Remove",
      cell: ({row}) => {
        return (
          <Button onClick={() => onRemoveRow(row.original.id)} className="w-full" color={Colors.danger}>
            <Trash />
          </Button>
        );
      },
    },
  ];
  return (
    <Table
      onCellEdit={onCellEdit}
      columns={columns}
      columnVisibility={{ id: false }}
      data={queries}
    />
  );
};

export default QueryTable;
