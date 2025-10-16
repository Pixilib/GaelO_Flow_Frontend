import { Info } from "../../icons";
import { Table, Badge, Popover } from "../../ui";
import { Colors } from "../../utils/enums";
import { JobsAction, OrthancJob } from "../../utils/types";
import JobActions from "./JobActions";

type JobTableProps = {
  data: OrthancJob[];
  onJobAction: (jobId: string, action: JobsAction) => void;
};

const JobTable = ({ data = [], onJobAction }: JobTableProps) => {
  const infoDetails = (rowData: any) => (
    <code><pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre></code>
  );

  const columns = [
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: (row: any) => (
        <Badge
          value={row.getValue()}
          className="max-w-[100px] overflow-hidden text-ellipsis"
        />
      ),
      enableColumnFilter: true,
    },
    {
      accessorKey: "state",
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
          <div className="flex">
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
          <Popover 
            popover={infoDetails(info.row.original)} 
            placement="left" 
            className="w-auto "
            withOnClick={true}
            backgroundColor="bg-white "
          >
            <Info data-gaelo-flow="jobs-info" size="1.5em" className="hover:scale-110 text-primary" />
          </Popover>
        );
      },
      enableColumnFilter: false,
    },
  ];

  return (
    <div data-gaelo-flow="jobs-datatable">
    <Table
      data={data}
      columns={columns}
      headerColor={Colors.white}
      headerTextSize="sm"
      className="bg-gray-100 dark:bg-slate-950 dark:text-white"
      enableColumnFilters
      enableSorting
      getRowClasses={() => "hover:bg-indigo-100 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700 hover:cursor-pointer"}
    />
    </div>
  );
};

export default JobTable;
