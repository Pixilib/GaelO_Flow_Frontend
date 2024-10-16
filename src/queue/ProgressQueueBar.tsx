import { deleteDeleteQueue, getDeleteQueue } from "../services/queues";
import { useCustomMutation, useCustomQuery } from "../utils";
import { ProgressBar, ProgressCircle, Spinner } from "../ui";
import { Cancel, Pause } from "../icons";
import { Queue } from "../utils/types";

type ProgressQueueProps = {
    queueData : Queue,
    onDelete: (event: React.MouseEvent) => void
};

const ProgressQueueBar = ({ queueData, onDelete }: ProgressQueueProps) => {

    return (
        <div className="flex items-center justify-center space-x-4">
            <ProgressBar progress={queueData.progress} />
            <div className="flex">
                <Cancel
                    className="text-sm cursor-pointer text-danger hover:text-danger-hover"
                    onClick={onDelete}
                />
            </div>
        </div>
    );
};

export default ProgressQueueBar;
