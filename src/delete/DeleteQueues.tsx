import { useSelector } from "react-redux";
import { getExistingDeleteQueues } from "../services/queues";
import { useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueueBar from "../queue/ProgressQueueBar";

const DeleteQueues = () => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingDeleteQueues, isPending } = useCustomQuery<string[]>(
        ['queue', 'delete', currentUserId?.toString() || ''],
        () => getExistingDeleteQueues(currentUserId)
    );

    if (isPending) return <Spinner />;

    return (
        <div className="w-full">
                {existingDeleteQueues?.map((uuid) => (
                    <div key={uuid} >
                        <ProgressQueueBar
                            uuid={uuid}
                        />
                    </div>
                ))}
            </div>
    );
};

export default DeleteQueues;
