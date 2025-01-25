import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getExistingQueriesQueues, getQueryQueue } from "../../../services/queues";
import { useCustomQuery } from "../../../utils";
import RetrieveQueueTable from "./RetrieveQueueTable";

const RetrieveQueues = () => {

  const { data: existingRetrieveQueues } = useCustomQuery<string[]>(
    ["queue", "query"],
    () => getExistingQueriesQueues(undefined)
  );

  const currentRetrieveJobs = useQueries({
    queries: existingRetrieveQueues?.map((id) => {
      return {
        queryKey: ["queue", "query", id],
        queryFn: () => getQueryQueue(id),
        refetchInterval: 5000,
        select: (data: object) => ({ jobs: data, id: id }),
      };
    })
      ?? [],
    combine: (results) => {
      return {
        data: results.map((result) => result.data).flat(),
      };
    },
  });

  const queueRows = useMemo(() => {
    return currentRetrieveJobs.data.filter(queue => queue).map((queue) => {
      const jobs = Object.values(queue.jobs);
      const states = jobs.map((job) => job.state);
      const counts = {};

      for (const state of states) {
        counts[state] = counts[state] ? counts[state] + 1 : 1;
      }
      return ({
        id: queue.id,
        progress: JSON.stringify(counts),
        userId: jobs[0].userId,
        jobs: queue.jobs,
      })
    }
    );
  }, [currentRetrieveJobs]);


  return (
    <RetrieveQueueTable queues={queueRows} />
  );
};

export default RetrieveQueues;
