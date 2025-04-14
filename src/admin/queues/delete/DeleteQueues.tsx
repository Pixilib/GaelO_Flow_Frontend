import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { getExistingDeleteQueues, getDeleteQueue } from "../../../services/queues";
import { useCustomQuery } from "../../../utils";
import DeleteQueueTable from "./DeleteQueueTable";
import { Badge } from "../../../ui";

const DeleteQueues = () => {

  const { data: existingDeleteQueues } = useCustomQuery<string[]>(
    ["queue", "query"],
    () => getExistingDeleteQueues(undefined)
  );

  const currentDeleteJobs = useQueries({
    queries: existingDeleteQueues?.map((id) => {
      return {
        queryKey: ["queue", "query", id],
        queryFn: () => getDeleteQueue(id),
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
    return currentDeleteJobs.data.filter(queue => queue).map((queue) => {
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
  }, [currentDeleteJobs]);


  return (
    <DeleteQueueTable queues={queueRows} />
  );
};

export default DeleteQueues;
