import { ProgressCircle } from "../ui";
import { Cancel } from "../icons";
import { Queue } from "../utils/types";

type ProgressQueueProps = {
    queueData: Queue;
    onDelete: (event: React.MouseEvent) => void;
    colors: { background: string; progress: string };
};

const ProgressQueueCircle = ({ queueData, onDelete, colors }: ProgressQueueProps) => {
    return (
        <div className="flex-col items-center justify-center">
            <ProgressCircle
                text={queueData?.state}
                progress={queueData?.progress || 0}
                size={150}
                className={colors.background}
            >
                <div className="flex justify-center">
                    <Cancel
                        className={`text-sm ${colors.progress} cursor-pointer hover:text-danger-hover`}
                        onClick={onDelete}
                    />
                </div>
            </ProgressCircle>
        </div>
    );
};

export default ProgressQueueCircle;
