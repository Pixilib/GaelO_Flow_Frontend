import {
  FaRedo as Resume,
  FaPlay as Play,
  FaPause as Pause,
  FaTimes as Cancel,
} from "react-icons/fa";
import { JobMutationVariables, PostJobsAction } from "../../utils/types";

type JobIconsProps = {
  jobId: string;
  onJobAction: ({Id, Action}:JobMutationVariables) => void;
};

const JobIcons = ({ jobId, onJobAction }: JobIconsProps) => {
  const handleClick = (Action: PostJobsAction) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onJobAction({ Id: jobId, Action });
  };

  const classIcons =
    "inline-flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110";
    
  return (
    <div className="flex space-x-3">
      <div
        className={`${classIcons} bg-primary`}
        onClick={handleClick("resubmit")}
      >
        <Resume color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-success`}
        onClick={handleClick("resume")}
      >
        <Play color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-[#DFB520]`}
        onClick={handleClick("pause")}
      >
        <Pause color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-danger`}
        onClick={handleClick("cancel")}
      >
        <Cancel color="white" size="1em" />
      </div>
    </div>
  );
};

export default JobIcons;
