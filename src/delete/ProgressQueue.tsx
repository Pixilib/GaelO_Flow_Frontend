import { deleteDeleteQueue, getDeleteQueue } from "../services/queues";
import { Colors, useCustomMutation, useCustomQuery } from "../utils";
import { Button, ProgressCircle, Spinner } from "../ui";
import { FaTrash, FaPause } from 'react-icons/fa'; // Import icons from react-icons

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
            <ProgressCircle text={data?.state} progress={data?.progress || 0} size={150} >
                <div className="flex justify-center">
                    <Button
                        color={Colors.danger}
                        onClick={() => mutateDeleteQueue({})}
                    >
                        <FaTrash className="mr-1" /> {/* Delete icon */}
                    </Button>
                    <Button
                        color={Colors.warning}
                        onClick={() => {/* Implement pause functionality here */ }}
                    >
                        <FaPause className="mr-1" /> {/* Pause icon */}
                    </Button>
                </div>
            </ProgressCircle>

        </div>
    );
};

export default ProgressQueue;
