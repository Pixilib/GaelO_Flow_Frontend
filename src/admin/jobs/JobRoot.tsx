import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getJobs, postJobs } from "../../services/jobs";
import { Spinner, Card, CardBody, CardFooter, CardHeader } from "../../ui";
import { Colors } from "../../utils/enums";
import { useCustomToast } from "../../utils/toastify";

import { JobPayload, JobsAction, OrthancJob } from "../../utils/types";
import JobTable from "./JobTable";

const JobRoot = () => {
  const { toastSuccess, toastError } = useCustomToast();

  const { data: jobData, isLoading: isLoadingJobs } = useCustomQuery<
    OrthancJob[]
  >(["jobs"], () => getJobs(), {
    enabled: true,
    refetchInterval: 10000,
  });
  const { mutate } = useCustomMutation<unknown, JobPayload>(
    (jobPayload: JobPayload) => postJobs(jobPayload),
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

  const handleJobAction = (id: string, action: JobsAction) => {
    mutate({ id, action });
  };

  if (isLoadingJobs) return <Spinner />;
  return (
    <Card className="l bg-almond dark:bg-neutral-500">
      <CardHeader
        centerTitle
        color={Colors.primary}
        title={"Manage Jobs"}
      />
      <CardBody
        color={Colors.almond} roundedTopLeft roundedTopRight
        className="rounded-sm dark:bg-neutral-500 rounded-br-2xl rounded-bl-2xl">
        <div className="w-full ">
          <JobTable data={jobData as any} onJobAction={handleJobAction} />
        </div>
      </CardBody>
    </Card>
  );
};

export default JobRoot;
