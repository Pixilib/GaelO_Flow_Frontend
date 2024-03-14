import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import Restart from "../../assets/restart.svg?react";
import { Colors } from "../../utils/enums";

//WIP for actions
const JobTable = ({ data = [] }) => {
  const columns = [

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
      header: "Action",
      cell: (row: any) => {
        return (
          <div className="flex justify-center">
            <Restart />
          </div>
        );
      },
    },
  ];

  return <Table data={data} columns={columns} color={Colors.almond} />;
};
export default JobTable;
