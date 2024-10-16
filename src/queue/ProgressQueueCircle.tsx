import { ProgressCircle } from "../ui";
import { Cancel } from "../icons";
import { Queue } from "../utils/types";

type ProgressQueueProps = {
    queueData: Queue,
    onDelete: (event: React.MouseEvent) => void
};

const ProgressQueueCircle = ({ queueData, onDelete }: ProgressQueueProps) => {

    return (
        <div className="flex-col items-center justify-center">
            <ProgressCircle text={queueData?.state} progress={queueData?.progress || 0} size={150}>
                <div className="flex justify-center">
                    <Cancel
                        className={`text-sm text-danger cursor-pointer hover:text-danger-hover `}
                        onClick={onDelete}
                    />
                </div>
            </ProgressCircle>
        </div>
    );
};

export default ProgressQueueCircle;
