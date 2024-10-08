import { useSelector } from "react-redux";
import { getExistingDeleteQueues, deleteDeleteQueue } from "../services/queues";
import { useCustomQuery, useCustomMutation } from "../utils";
import { RootState } from "../store";
import { Spinner } from "../ui";
import ProgressQueue from "./ProgressQueue";

const DeleteQueues = () => {
    const currentUserId = useSelector((state: RootState) => state.user.currentUserId);

    const { data: existingDeleteQueues, isPending } = useCustomQuery<string[]>(
        ['queue', 'delete', currentUserId?.toString() || ''],
        () => getExistingDeleteQueues(currentUserId)
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        (uuid: string) => deleteDeleteQueue(uuid),
        {
            onSuccess: () => {
            },
        }
    );

    if (isPending) return <Spinner />;

    return (
        <div className="flex flex-col w-full p-4">
            <p className="text-lg font-semibold text-center">Progress </p>
            <div className="flex flex-col space-y-4">
                {existingDeleteQueues?.map((uuid) => (
                    <div key={uuid} >
                        <ProgressQueue
                            uuid={uuid}
                            onStop={() => mutateDeleteQueue(uuid)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DeleteQueues;
