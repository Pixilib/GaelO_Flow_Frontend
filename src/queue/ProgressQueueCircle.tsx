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
        <div className="flex flex-col items-center justify-center p-4 space-y-4 md:p-6">
            <ProgressCircle
                text={queueData?.state}
                progress={queueData?.progress || 0}
                size={120}
                className={`${colors.background} transition duration-300 ease-in-out`}
            >
                <div className="flex justify-center mt-2">
                    <Cancel
                        className={`text-base md:text-lg ${colors.progress} cursor-pointer hover:text-danger-hover transition duration-200 ease-in-out`}
                        onClick={onDelete}
                    />
                </div>
            </ProgressCircle>
        </div>
    );
};

export default ProgressQueueCircle;
