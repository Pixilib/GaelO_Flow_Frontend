import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getJobs, postJobs } from "../../services/jobs";

import { Spinner, Card, CardBody, CardFooter } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomToast } from "../../utils/toastify";
import { JobPayload, JobsAction, OrthancJob } from '../../utils/types';
import JobTable from "./JobTable";

const JobRoot = () => {

  const { toastSuccess, toastError } = useCustomToast()

  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<OrthancJob[]>
    (["jobs"], () => getJobs(), {
      enabled: true,
      refetchInterval: 10000,

    });
  const { mutate } = useCustomMutation<unknown, JobPayload>(
    ({ Id, Action }: JobPayload) =>
      postJobs({ Id, Action }),
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

  const handleJobAction = (id: string, action: JobsAction) => {
    mutate({ Id: id, Action: action });
  };

  if (isLoadingJobs) return <Spinner />
  return (
    <div className="flex justify-center w-full h-full">
      <Card className="w-full bg-white">
        <CardBody color={Colors.light} roundedTopLeft roundedTopRight>
          <h2 className="mt-4 mb-4 text-2xl font-bold text-primary">Manage Operations Jobs</h2>
          <JobTable data={jobData as any} onJobAction={handleJobAction} />
        </CardBody>
        <CardFooter>

        </CardFooter>
      </Card>
    </div>
  );
};

export default JobRoot;
