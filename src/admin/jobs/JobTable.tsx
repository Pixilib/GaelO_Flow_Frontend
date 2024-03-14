import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import Restart from "../../assets/restart.svg?react";

//WIP for actions
const JobTable = ({ data = [] }) => {
  const columns = [
    {
      accessorKey: "ID",
      header: "Id",
      cell: (row: any) => (
        <div className="text-xs text-slate-500 ">
          {row.getValue() as string}
        </div>
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
      cell: (row: any) => {
        return (
          <div className="flex justify-center">
            <Restart />
          </div>
        );
      },
    },
  ];

  return <Table data={data.data} columns={columns} classForThead={"bg-almond border-almond rounded-t-xl"} />;
};
export default JobTable;
