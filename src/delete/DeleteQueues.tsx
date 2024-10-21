import { useSelector } from "react-redux";
import { deleteDeleteQueue, getDeleteQueue, getExistingDeleteQueues } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";
import { Queue } from "../utils/types";
import ProgressQueueCircle from "../queue/ProgressQueueCircle";

type DeleteQueueProps = {
    circle?: boolean
}

const DeleteQueues = ({ circle = false }: DeleteQueueProps) => {
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

    if (!firstQueue) return null;
    if (isPending) return <Spinner />;

    return (
        <div className="w-full space-y-4">
            {existingDeleteQueues?.map((uuid) => (
                <div
                    key={uuid}
                    className="p-4 bg-white border border-gray-100 shadow-inner rounded-xl"
                >
                    {
                        circle ?
                            <ProgressQueueCircle queueData={data[0]} onDelete={() => mutateDeleteQueue({})} />
                            :
                            <ProgressQueueBar progress={data[0].progress} onDelete={() => mutateDeleteQueue({})} />
                    }

                </div>
            ))}
        </div>
    );
};

export default DeleteQueues;
