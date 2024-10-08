import { deleteDeleteQueue, getDeleteQueue } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { ProgressCircle, Spinner } from "../ui";
import { Cancel, Pause } from "../icons";

type ProgressQueueProps = {
    uuid: string;
};

const ProgressQueue = ({ uuid }: ProgressQueueProps) => {
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
        <div className="flex-col items-center justify-center">
            <ProgressCircle text={data?.state} progress={data?.progress || 0} size={150}>
                <div className="flex justify-center">
                    <Pause
                        className={`text-sm cursor-pointer text- hover:text-yellow-500 mr-2`} // Change color on hover, add margin for spacing
                        disabled
                        onClick={() => {/* Implement pause functionality here */ }}
                    />
                    <Cancel
                        className={`text-sm text-danger cursor-pointer hover:text-danger-hover `} // Change color on hover
                        onClick={() => mutateDeleteQueue({})}
                    />                   
                </div>
            </ProgressCircle>
        </div>
    );
};

export default ProgressQueue;
