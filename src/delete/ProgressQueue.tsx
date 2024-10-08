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
        <div className="relative flex items-center justify-center">
            <ProgressCircle text={data?.state} progress={data?.progress || 0} size={150} />
            <div className="absolute bottom-0 flex flex-col items-center space-y-1 transform -translate-x-1/2 left-1/2">
                <Button 
                    color={Colors.danger} 
                    onClick={() => mutateDeleteQueue({})}
                    className="flex items-center"
                >
                    <FaTrash className="mr-1" /> {/* Delete icon */}
                </Button>
                <Button 
                    color={Colors.warning} 
                    onClick={() => {/* Implement pause functionality here */}}
                    className="flex items-center"
                >
                    <FaPause className="mr-1" /> {/* Pause icon */}
                </Button>
            </div>
        </div>
    );
};

export default ProgressQueue;
