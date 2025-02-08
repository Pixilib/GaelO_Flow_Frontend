import React, { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Table } from "../../ui";
import { Colors, Series } from "../../utils";
import DatasetSeriesActions from "./DatasetSeriesActions";

type DatasetSeriesTableProps = {
  series: Series[];
  onActionClick: (action: string, seriesId: string) => void;
};

const DatasetSeriesTable: React.FC<DatasetSeriesTableProps> = ({
  series,
  onActionClick,
}) => {
  const columns: ColumnDef<Series>[] = useMemo(
    () => [
      {
        accessorKey: "mainDicomTags.seriesDescription",
        header: "Series Description",
      },
      {
        accessorKey: "mainDicomTags.modality",
        header: "Modality",
      },
      {
        accessorKey: "mainDicomTags.seriesNumber",
        header: "Series Number",
      },
      {
        accessorFn: (data) => data.instances.length,
        header: "Instances",
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          return (
            <DatasetSeriesActions
              series={row.original}
              onActionClick={onActionClick}
            />
          );
        },
      },
    ],
    [onActionClick]
  );

  return (
    <Table
      columns={columns}
      data={series ?? []}
      headerColor={Colors.white}
      headerTextSize="xs"
      enableColumnFilters
      enableSorting
      className="text-xs bg-gray-100"
    />
  );
};

export default DatasetSeriesTable;
