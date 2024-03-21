import { BsInfoCircle } from "react-icons/bs"; 
import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import { Colors } from "../../utils/enums";
import JobIcons from "./JobIcons";
import Popover from "../../ui/Popover";

type JobTableProps = {
  data: any[];
  onJobAction: (id: string, action: string) => void;
};
//WIP for actions
const JobTable = ({ data = [], onJobAction }:JobTableProps) => {
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
        cell: (info: any) => {
          return (
            <div className="flex justify-center">
            <JobIcons jobId={info.row.original.ID} onAction={onJobAction}/>   
          </div>
        );
      },
      enableColumnFilter: false,
    },
    {
      header: "Info",
      cell: (info:any) => {
        return (
          <Popover popover={infoDetails(info.row.original)} placement="left" className="w-auto ">
          <div className="flex justify-center transition-transform hover:scale-110">
            <BsInfoCircle size="1.5em" color="gray" onClick={() => handleInfoClick(info.row.original)}/>
          </div>
          </Popover>
        );
      },
      enableColumnFilter: false,
    }
  ];
  const infoDetails = (rowData:any) => <code><pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre></code>;
  const handleInfoClick = (rowData:any) => {
    console.log('Row data:', JSON.stringify(rowData, null, 2));
    return <pre>{JSON.stringify(rowData, null, 4)}</pre>;
  };
  return <Table data={data} columns={columns} color={Colors.almond} />;
};
export default JobTable;
