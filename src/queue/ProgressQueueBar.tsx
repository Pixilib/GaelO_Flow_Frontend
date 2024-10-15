import { deleteDeleteQueue, getDeleteQueue } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { ProgressBar, ProgressCircle, Spinner } from "../ui";
import { Cancel, Pause } from "../icons";

type ProgressQueueProps = {
    uuid: string;
};

const ProgressQueueBar = ({ uuid }: ProgressQueueProps) => {
    const { data, isPending } = useCustomQuery(
        ['queue', 'delete', uuid],
        () => getDeleteQueue(uuid),
        { refetchInterval: 2000 }
    );

    const { mutate: mutateDeleteQueue } = useCustomMutation(
        () => deleteDeleteQueue(uuid),
        [['queue', 'delete']]
    );

    if (isPending) return <Spinner />;

    return (
        <div className="flex items-center justify-center space-x-4">
            <ProgressBar progress={data?.progress || 0} />
            <div className="flex">
                <Pause
                    className="mr-2 text-sm cursor-pointer hover:text-yellow-500"
                    disabled
                    onClick={() => {
                        // Implement pause functionality here
                    }}
                />
                <Cancel
                    className="text-sm cursor-pointer text-danger hover:text-danger-hover"
                    onClick={() => mutateDeleteQueue({})}
                />
            </div>
        </div>
    );
};

export default ProgressQueueBar;
