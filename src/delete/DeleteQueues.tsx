import { useSelector } from "react-redux";
import { getExistingDeleteQueues } from "../services/queues";
import { useCustomQuery } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueue from "./ProgressQueue";

const DeleteQueues = () => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingDeleteQueues, isPending } = useCustomQuery<string[]>(
        ['queue', 'delete', currentUserId.toString()], 
        () => getExistingDeleteQueues(currentUserId)
    );

    if (isPending) return <Spinner />;

    return (
        <div className="flex flex-col w-full p-4">
            <p className="text-lg font-semibold text-center">Progress Queue</p>
            <div className="flex flex-col space-y-4">
                {existingDeleteQueues?.map((uuid) => (
                    <ProgressQueue key={uuid} uuid={uuid} />
                ))}
            </div>
        </div>
    );
};

export default DeleteQueues;
