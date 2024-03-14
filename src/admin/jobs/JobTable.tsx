import Table from "../../ui/Table";
import Badge from "../../ui/Badge";

import Restart from "../../assets/restart.svg?react";

//WIP for actions
const JobTable = ({ data = [] }) => {
  const columns = [
    {
      accessorKey: "ID",
      header: "Id",
      cell: (row: any) => (
        <span className="text-xs text-slate-500 ">
          {row.getValue() as string}
        </span>
      ),
    },
    {
      accessorKey: "Type",
      header: "Type",
    },
    {
      accessorKey: "Progress",
      header: "Progress",
      cell: (row: any) => (
        <Badge
          value={row.getValue()}
          className="bg-badge-gray text-badge-blue-text"
        />
      ),
    },
    {
      accessorKey: "State",
      header: "State",
      cell: (row: any) => <Badge value={row.getValue()} />,
    },
    {
      header: "Actions",
      cell: ({ row }: any) => {
        return (
          <div className="flex justify-center">
            <Restart />
          </div>
        );
      },
    },
  ];

  return <Table data={data} columns={columns} />;
};
export default JobTable;
