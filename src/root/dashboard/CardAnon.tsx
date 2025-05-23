import Button from "../../ui/Button";
import Card, { CardHeader, CardBody, CardFooter } from "../../ui/Card";
import { Colors } from "../../utils/enums";
import { useSelector } from "react-redux";
import {
  getExistingAnonymizeQueues,
  getAnonymizeQueue,
  deleteAnonymizeQueue,
} from "../../services/queues";
import { useCustomMutation, useCustomQuery } from "../../utils";
import { useMemo } from "react";
import ProgressQueueCircle from "../../queue/ProgressQueueCircle";
import { AnonQueue } from "../../utils/types";
import { RootState } from "../../store";
import Anon from "../../icons/Anon"; // Import the Anon icon
import { Validate } from "../../icons";

const CardAnon = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUserId
  );

  const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
    ["queue", "anonymize", currentUserId?.toString() || ""],
    () => getExistingAnonymizeQueues(currentUserId)
  );

  const firstQueue = existingAnonymizeQueues?.[0];

  const { data } = useCustomQuery<AnonQueue[]>(
    ["queue", "anonymize", firstQueue],
    () => getAnonymizeQueue(firstQueue),
    {
      refetchInterval: 2000,
      enabled: firstQueue != null,
    }
  );

  const { mutate: mutateDeleteQueue } = useCustomMutation(
    () => deleteAnonymizeQueue(firstQueue),
    [["queue", "anonymize"]]
  );

  const globalProgress = useMemo(() => {
    if (!data || data.length === 0) return 0;
    const totalJobs = data.length;
    const completedJobs = data.filter(
      (job) => job.state === "completed" || job.state === "failed"
    ).length;
    return totalJobs === 0 ? 0 : (completedJobs / totalJobs) * 100;
  }, [data]);

  return (
    <Card className="w-full bg-white overflow-hidden rounded-lg rounded-tl-2xl rounded-tr-2xl shadow-lg md:max-w-md dark:bg-neutral-500">
      <CardHeader
        centerTitle
        color={Colors.blueCustom}
        className="flex items-center"
      >
        <Anon className="mr-3 text-xl text-white" />
        <span className="text-lg font-bold text-white">Anonymization</span>
      </CardHeader>
      <CardBody
        className="flex flex-col items-center justify-center dark:bg-neutral-500 bg-gray-50"
        color={Colors.white}
      >
        {firstQueue ? (
          <ProgressQueueCircle
            onDelete={() => mutateDeleteQueue({})}
            queueData={{
              progress: globalProgress,
              state: "",
              id: "",
              results: undefined,
              userId: currentUserId || 0,
            }}
            colors={{ background: "text-gray-300", progress: Colors.primary }}
          />
        ) : (
          <Validate className="text-success h-10 w-10" />
        )}
      </CardBody>
    </Card>
  );
};

export default CardAnon;
