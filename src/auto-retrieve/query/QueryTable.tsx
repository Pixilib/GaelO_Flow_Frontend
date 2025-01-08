import moment from "moment";
import { Table } from "../../ui";
import { QueryStudy } from "../types";

type QueryTableProps = {
  queries: QueryStudy[];
};

const QueryTable = ({ queries }: QueryTableProps) => {
  const columns = [
    {
      id: "id",
      accessorKey: "id",
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "patientID",
      header: "Patient ID",
    },
    {
      accessorKey: "accessionNumber",
      header: "Accession Number",
    },
    {
      id: "DateFrom",
      accessorFn: (row) => {
        if (row.DateFrom == "" || row.DateFrom == null) return null;
        return moment(row.DateFrom, "YYYYMMDD", true)?.toDate();
      },
      header: "Date From",
      //isEditable: true,
      //editionProperties: {
      //    type: 'CALENDAR'
      //},
      //filterType: filter.DATE_FILTER,
      //filterFn: isWithinDateRange
    },
    {
      id: "DateTo",
      accessorFn: (row) => {
        if (row.DateTo == "" || row.DateTo == null) return null;
        return moment(row.DateFrom, "YYYYMMDD", true)?.toDate();
      },
      header: "Date To",
    },
    {
      accessorKey: "studyDescription",
      header: "Study Description",
    },
    {
      accessorKey: "modalitiesInStudy",
      header: "Modalities",
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
      accessorKey: "aet",
      header: "AET",
      /*
                    cell: ({ row, getValue }) => {
            return <SelectModalities
                previousModalities={getValue()}
                onChange={(value) => cellEditHandler(row.original.key, 'ModalitiesInStudy', value)}
            />
        }
            */
    },
  ];
  return (
    <Table columns={columns} columnVisibility={{ id: false }} data={queries} />
  );
};

export default QueryTable;
