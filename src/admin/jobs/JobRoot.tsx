import { useCustomMutation, useCustomQuery } from "../../utils/reactQuery";
import { getJobs, postJobs } from "../../services/jobs";

import { Spinner, Card, CardBody, CardFooter, CardHeader } from "../../ui";
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
      <Card className="l bg-almond">
        <CardHeader
                className="flex items-center justify-center rounded-t-lg text-bg-light"
                color={Colors.primary}
                title={'Manage Jobs'}
            />
        <CardBody color={Colors.almond} roundedTopLeft roundedTopRight>
        <div className="w-full mt-6 mb-8">
          <JobTable data={jobData as any} onJobAction={handleJobAction} />
          </div>
        </CardBody>
        <CardFooter className="flex justify-center bg-almond">

        </CardFooter>
      </Card>
   
  );
};

export default JobRoot;
