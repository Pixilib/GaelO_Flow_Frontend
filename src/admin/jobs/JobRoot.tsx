import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getJobs, postJobs } from "../../services/jobs";

import { Spinner, Card, CardHeader, CardBody, CardFooter } from "../../ui";
import { Colors } from "../../utils/enums";
import { JobPayload, JobsAction, OrthancJob } from '../../utils/types';

import JobTable from "./JobTable";
import { useCustomToast } from "src/utils/toastify";

const JobRoot = () => {

  const { toastSuccess, toastError } = useCustomToast()

  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<
    OrthancJob[]
  >(["jobs"], () => getJobs(), {
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

  const handleJobAction = (id :string, action : JobsAction) => {
    mutate({ Id : id, Action : action });
  };

  if (isLoadingJobs) return <Spinner />
  return (
    <div className="flex justify-center w-full h-full">
      <Card className="w-full bg-white">
        <CardHeader title="Jobs" color={Colors.primary} />
        <CardBody>
          <JobTable data={jobData as any} onJobAction={handleJobAction} />
        </CardBody>
        <CardFooter>
          
        </CardFooter>
      </Card>
    </div>
  );
};

export default JobRoot;
