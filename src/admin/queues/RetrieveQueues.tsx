import { useQueries } from "@tanstack/react-query";
import { getExistingQueriesQueues, getQueryQueue } from "../../services/queues";
import { useCustomQuery } from "../../utils";
import { useMemo } from "react";
import RetrieveQueueTable from "./RetrieveQueueTable";

const RetrieveQueues = () => {
  const { data: existingRetrieveQueues } = useCustomQuery<string[]>(
    ["queue", "query"],
    () => getExistingQueriesQueues(undefined)
  );

  const currentRetrieveJobs = useQueries({
    queries: existingRetrieveQueues
      ? existingRetrieveQueues?.map((id) => {
          return {
            queryKey: ["queue", "query", id],
            queryFn: () => getQueryQueue(id),
          };
        })
      : [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data).flat(),
      };
    },
  });

  const queueRows = useMemo(() => {
    const jobsByQueue = {};
    console.log(currentRetrieveJobs.data)
    for (const job of currentRetrieveJobs.data) {
      console.log(job)
      if (!jobsByQueue?.[job.userId]) {
        jobsByQueue[job.userId] = {
          //id: job.id,
          userId: job.userId,
          jobs: [job],
        };
      } else {
        const queue = jobsByQueue?.[job.userId];
        queue.jobs.push(job);
      }
    }

    return Object.values(jobsByQueue).map((queue) => ({
      id: queue.id,
      userId: queue.userId,
      jobs: queue.jobs,
    }));
  }, [currentRetrieveJobs]);


  return (
      <RetrieveQueueTable queues={queueRows} />
  );
};

export default RetrieveQueues;
