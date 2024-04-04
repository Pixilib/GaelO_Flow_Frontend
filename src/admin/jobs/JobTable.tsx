import { BsInfoCircle as Info } from "react-icons/bs";

import { Colors } from "../../utils/enums";
import { Table } from "../../ui";
import Badge from "../../ui/Badge";
import Popover from "../../ui/Popover";
import { useCustomMutation } from "../../utils/reactQuery";
import { useCustomToast } from "../../utils/toastify";
import { JobMutationPayload, JobsAction, OrthancJob } from "../../utils/types2";
import { postJobs } from "../../services/jobs";
import JobActions from "./JobActions";

type JobTableProps = {
  data: OrthancJob[];
};

const JobTable = ({ data = [] }: JobTableProps) => {
  const { toastSuccess, toastError } = useCustomToast();

  const handleJobAction = (jobId: string, action: JobsAction) => {
    mutate({ Id: jobId, Action: action });
  };

  const { mutate } = useCustomMutation<void, JobMutationPayload>(
    ({ Id, Action }: JobMutationPayload) => postJobs({ Id, Action }),
    [["jobs"]],
    {
      onSuccess: (_: any, variables) => {
        toastSuccess(`${variables.Action} Job with success`);
      },
      onError: (e: any, variables) => {
        toastError(`${variables.Action} Job is failed. ${e.statusText}`);
      },
    }
  );

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
      cell: (row: any) => (
        <Badge
          value={row.getValue()}
          className="rounded-full bg-[#CDFFCD] text-success"
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
              onJobAction={handleJobAction}
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
          <div className="relative">
            <Popover
              popover={infoDetails(info.row.original)}
              placement="left"
              className="relative w-auto "
              withOnClick={true}
            >
              <div className="relative transition-transform hover:scale-110">
                <Info size="1.5em" color="gray" className="relative" />
              </div>
            </Popover>
          </div>
        );
      },
      enableColumnFilter: false,
    },
  ];

  const infoDetails = (rowData: any) => (
    <code>
      <pre className="text-xs">{JSON.stringify(rowData, null, 4)}</pre>
    </code>
  );

  return <Table data={data} columns={columns} color={Colors.almond} />;
};

export default JobTable;
