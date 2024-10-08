import { useSelector } from "react-redux";
import { getExistingDeleteQueues } from "../services/queues";
import { useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueue from "./ProgressQueue";

const DeleteQueues = () => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingDeleteQueues, isPending } = useCustomQuery<string[]>(
        ['queue', 'delete', currentUserId?.toString() || ''],
        () => getExistingDeleteQueues(currentUserId)
    );

    if (isPending) return <Spinner />;

    return (
        <div className="flex flex-col">
            <div className="flex gap-4">
                {existingDeleteQueues?.map((uuid) => (
                    <div key={uuid} >
                        <ProgressQueue
                            uuid={uuid}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteQueues;
