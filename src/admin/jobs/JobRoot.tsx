import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getJobs, postJobs } from "../../services/jobs";

import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import Spinner from "../../ui/Spinner";

import { useCustomToast } from "../../utils/toastify";
import { Colors } from "../../utils/enums";
import { JobMutationVariables, OrthancJob, postJobsAction } from '../../utils/types2';

import JobTable from "./JobTable";

const JobRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<OrthancJob>(
    ["jobs"],
    () => getJobs(),
    {
      enabled: true,
      refetchInterval: 10000,
    }
  );

  const { mutate } = useCustomMutation<unknown,JobMutationVariables>(
    ({ id, action }: JobMutationVariables) =>
      postJobs(id, action),
    [["jobs"]],
    {
      onSuccess: (_: any, variables) => {
        toastSuccess(`${variables.action} Job with success`);
      },
      onError: (e: any, variables) => {
        toastError(`${variables.action} Job is failed. ${e.statusText}`);
      },
    }
  );

  const handleJobAction = (id: string, action: postJobsAction) => {
    mutate({ id, action });
  };

  if (isLoadingJobs) return <Spinner />

  return (
    <div className="flex justify-center w-full h-full">
      <Card className="w-full bg-white">
        <CardHeader title="Jobs" color={Colors.primary} />
        <CardBody>
            <JobTable data={jobData as any} onJobAction={handleJobAction} />
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default JobRoot;
