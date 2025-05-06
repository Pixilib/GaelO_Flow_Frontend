import { Spinner } from "../../../ui";
import { getProcessingJobs } from "../../../services/queues";
import { useCustomQuery } from "../../../utils";
import ProcessingQueueTable from "./ProcessingQueueTable";
import { ProcessingJob } from "src/utils/types";

const ProcessingQueues = () => {
  const { data: jobRows, isPending } = useCustomQuery<object[]>(
    ["processing"],
    () => getProcessingJobs(),
    {
      select: (data: object[]) => {
        return data.map((job: ProcessingJob) => ({
          jobId: job.id,
          progress: job.progress,
          state: job.state,
          userId: job.userId,
          type: job.type,
          payload: job.payload,
        }));
      },
      refetchInterval: 5000,
    }
  );

  if (isPending) {
    return <Spinner />;
  }


  return (
    <ProcessingQueueTable jobs={jobRows ?? []} />
  );
};

export default ProcessingQueues;
