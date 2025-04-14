import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getExistingAnonymizeQueues, getAnonymizeQueue } from "../../../services/queues";
import { useCustomQuery } from "../../../utils";
import AnonymizeQueueTable from "./AnonymizeQueueTable";
import { Badge } from "../../../ui";

const AnonymizeQueues = () => {

  const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
    ["queue", "query"],
    () => getExistingAnonymizeQueues(undefined)
  );

  const currentAnonymizeJobs = useQueries({
    queries: existingAnonymizeQueues?.map((id) => {
      return {
        queryKey: ["queue", "query", id],
        queryFn: () => getAnonymizeQueue(id),
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
    return currentAnonymizeJobs.data.filter(queue => queue).map((queue) => {
      if (!queue) return; 
      const jobs = Object.values(queue.jobs);
      const states = jobs.map((job) => job.state);
      const counts = {};

      for (const state of states) {
        counts[state] = counts[state] ? counts[state] + 1 : 1;
      }

      const progressHtml = (
        <div className="flex gap-2">
          <Badge variant="success">Complete : {counts?.completed ? counts.completed : "0"}</Badge>
          <Badge variant="warning">Active : {counts?.active ? counts.active : "0"}</Badge>
          <Badge>Waiting : {counts?.wait ? counts.wait : "0"}</Badge>
          {counts?.paused && <Badge variant="warning">Paused : {counts?.paused}</Badge>}
          {counts?.failed && <Badge variant="danger">Failed : {counts?.failed ? counts.failed : "0"}</Badge>}
        </div>
      );

      return ({
        id: queue.id,
        progress: progressHtml,
        userId: jobs?.[0]?.userId,
        jobs: queue.jobs,
      })
    }
    );
  }, [currentAnonymizeJobs]);


  return (
    <AnonymizeQueueTable queues={queueRows} />
  );
};

export default AnonymizeQueues;
