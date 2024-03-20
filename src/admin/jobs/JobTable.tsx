import { BsInfoCircle } from "react-icons/bs"; 
import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import { Colors } from "../../utils/enums";
import JobIcons from "./JobIcons";
import Popover from "../../ui/Popover";

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
      cell: (info:any) => {
        const row = info.row.original;
        return (
          <Popover popover={infoDetails(row)} placement="left" className="w-auto ">
          <div className="flex justify-center transition-transform hover:scale-110">
            <BsInfoCircle size="1.5em" color="gray" onClick={() => handleInfoClick(row)}/>
          </div>
          </Popover>
        );
      },
      enableColumnFilter: false,
    }
  ];
  const infoDetails = (rowData:any) => <pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre>;
  const handleInfoClick = (rowData:any) => {
    console.log('Row data:', JSON.stringify(rowData, null, 2));
    return <pre>{JSON.stringify(rowData, null, 4)}</pre>;
  };
  return <Table data={data} columns={columns} color={Colors.almond} />;
};
export default JobTable;
