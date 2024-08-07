import { BsInfoCircle as Info } from "react-icons/bs";
import { Table, Badge, Popover } from "../../ui";

import { Colors } from "../../utils/enums";
import { JobsAction } from "../../utils/types";
import JobActions from "./JobActions";

//!WIP 
//! Needs to fix implemntation of PopOver
type JobTableProps = {
  data: any[];
  onJobAction: (jobId: string, action: JobsAction) => void;
};
const JobTable = ({ data = [], onJobAction }: JobTableProps) => {

  const infoDetails = (rowData: any) => <code><pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre></code>;

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
        />
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "State",
      header: "State",
      cell: (row: any) => (
        <Badge
          value={row.getValue()}
          variant="success"
        />
      ),
    },
    {
      header: "Action",
      cell: (info: any) => {
        return (
          <div className="flex justify-center">
            <JobActions
              jobId={info.row.original.ID}
              onJobAction={onJobAction}
            />
          </div>
        );
      },
      enableColumnFilter: false,
    },
    {
      header: "Info",
      cell: (info: any) => {
        return (
          <Popover popover={infoDetails(info.row.original)} placement="left" className="w-auto" withOnClick={true}>
            <Info size="1.5em" color="gray" className="hover:scale-110" />
          </Popover>
        );
      },
      enableColumnFilter: false,
    },
  ];

  return <Table
    data={data}
    columns={columns}
    headerColor={Colors.white}
    headerTextSize="sm"
    className="bg-gray-100"
    enableColumnFilters enableSorting />;
};

export default JobTable;
