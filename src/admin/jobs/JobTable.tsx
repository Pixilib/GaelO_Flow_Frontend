import { BsInfoCircle as Info } from "react-icons/bs";
import Table from "../../ui/table/Table";
import Badge from "../../ui/Badge";

import { Colors } from "../../utils/enums";
import JobIcons from "./JobIcons";
import Popover from "../../ui/Popover";
import { postJobsAction } from "../../utils/types2";

type JobTableProps = {
  data: any[];
  onJobAction: (id: string, action: postJobsAction) => void;
};
//WIP for actions
const JobTable = ({ data = [], onJobAction }: JobTableProps) => {

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
            <JobIcons jobId={info.row.original.ID} onAction={onJobAction} />
          </div>
        );
      },
      enableColumnFilter: false,
    },
    {
      header: "Info",
      cell: (info: any) => {
        return (
          <>
            <div className="absolute">
              <Popover popover={infoDetails(info.row.original)} placement="left" className="w-auto" withOnClick={true}>
                <div className="transition-transform hover:scale-110">
                  <Info size="1.5em" color="gray" />
                </div>
              </Popover>
            </div>
          </>
        );
      },
      enableColumnFilter: false,
    }
  ];
  
  const infoDetails = (rowData: any) => <code><pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre></code>;

  return <Table data={data} columns={columns} color={Colors.almond} />;
};
export default JobTable;
