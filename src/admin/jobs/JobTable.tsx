import { BsInfoCircle } from "react-icons/bs"; 
import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import { Colors } from "../../utils/enums";
import JobIcons from "./JobIcons";

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
          className="rounded-full bg-badge-grayCustom text-badge-blue-text"
        />
      ),
    },
    {
      accessorKey: "State",
      header: "State",
      cell: (row: any) => <Badge value={row.getValue()} className="rounded-full bg-[#CDFFCD] text-success" />,
    },
    {
      header: "Action",
      cell: () => {
        return (
          <div className="flex justify-center">
            <JobIcons/>   
          </div>
        );
      },
      enableColumnFilter: false,
    },
    {
      header: "Info",
      cell: () => {
        return (
          <div className="flex justify-center transition-transform hover:scale-110">
            <BsInfoCircle size="2em" color="gray"  />
          </div>
        );
      },
      enableColumnFilter: false,
    }
  ];

  return <Table data={data} columns={columns} color={Colors.almond} />;
};
export default JobTable;
