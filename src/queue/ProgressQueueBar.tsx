import { ProgressBar } from "../ui";
import { Cancel } from "../icons";

type ProgressQueueProps = {
    progress : number,
    onDelete: (event: React.MouseEvent) => void
};

const ProgressQueueBar = ({ progress, onDelete }: ProgressQueueProps) => {

    return (
        <div className="flex items-center justify-center space-x-4">
            <ProgressBar progress={progress} />
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
