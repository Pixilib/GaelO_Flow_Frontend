import { useSelector } from "react-redux";
import { deleteAnonymizeQueue, getAnonymizeQueue, getExistingAnonymizeQueues } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";
import { Queue } from "../utils/types";

const AnonQueues = () => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingAnonymizeQueues } = useCustomQuery<string[]>(
        ['queue', 'anon', currentUserId?.toString() || ''],
        () => getExistingAnonymizeQueues(currentUserId)
    );

    const firstQueue  = existingAnonymizeQueues?.[0]

    const { data, isPending , isLoading} = useCustomQuery<Queue>(
        ['queue', 'anon', firstQueue],
        () => getAnonymizeQueue(firstQueue),
        {   refetchInterval: 2000, 
            enabled : existingAnonymizeQueues?.length > 0 }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteAnonymizeQueue(firstQueue),
        [['queue', 'anon']]
    );

    if (existingAnonymizeQueues?.length > 0 && isPending) return <Spinner />;

    return (
        <div className="w-full space-y-4">
            {existingAnonymizeQueues?.map((uuid) => (
                <div
                    key={uuid}
                    className="p-4 bg-white border border-gray-100 shadow-inner rounded-xl"
                >
                    <ProgressQueueBar queueData={data} onDelete={mutateDeleteQueue} />
                </div>
            ))}
        </div>
    );
};

export default AnonQueues;
