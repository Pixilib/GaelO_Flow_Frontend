import { useSelector } from "react-redux";
import { deleteDeleteQueue, getDeleteQueue, getExistingDeleteQueues } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";
import { Queue } from "../utils/types";
import { useEffect, useMemo } from "react";

type DeleteQueueProps = {
    onFinish : () => void;
}
const DeleteQueues = ({onFinish} : DeleteQueueProps) => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingDeleteQueues } = useCustomQuery<string[]>(
        ['queue', 'delete', currentUserId?.toString() || ''],
        () => getExistingDeleteQueues(currentUserId)
    );

    const firstQueue = existingDeleteQueues?.[0]

    const { data, isPending } = useCustomQuery<Queue[]>(
        ['queue', 'delete', firstQueue],
        () => getDeleteQueue(firstQueue),
        {
            refetchInterval: 2000,
            enabled: firstQueue != null
        }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteDeleteQueue(firstQueue),
        [['queue', 'delete']]
    );

    const globalProgress = useMemo(() => {
        if (!data || data.length === 0) return 0;
        const totalJobs = data.length;
        const completedJobs = data.filter(
            (job) => job.state === "completed" || job.state === "failed"
        ).length;
        return totalJobs === 0 ? 0 : (completedJobs / totalJobs) * 100;
    }, [data]);

    useEffect(() => {
        if (globalProgress === 100) {
            onFinish();
        }
    }, [globalProgress])

    if (!firstQueue) return null;
    if (isPending) return <Spinner />;

    return (
        <>
            {firstQueue && (
                <div className="w-full"
                >
                    <ProgressQueueBar progress={globalProgress} onDelete={() => mutateDeleteQueue({})} />
                </div>
            )}
        </>
    );
};

export default DeleteQueues;
