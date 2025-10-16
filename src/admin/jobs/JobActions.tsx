import { JobsAction } from "../../utils/types";
import { Cancel, Pause, Play, Resume } from "../../icons";

type JobActionsProps = {
  jobId: string;
  onJobAction: (jobId :string, action :JobsAction) => void;
};

const JobActions = ({ jobId, onJobAction }: JobActionsProps) => {

  const handleClick = (action :JobsAction) => (e: React.MouseEvent) => {
    e.stopPropagation();
    onJobAction(jobId, action);
  };

  const classIcons =
    "inline-flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110";

  return (
    <div className="flex space-x-3">
      <div
        className={`${classIcons} bg-primary`}
        onClick={handleClick("resubmit")}
      >
        <Resume data-gaelo-flow="jobs-buttonReset" color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-success`}
        onClick={handleClick("resume")}
      >
        <Play data-gaelo-flow="jobs-buttonPlay" color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-[#DFB520]`}
        onClick={handleClick("pause")}
      >
        <Pause data-gaelo-flow="jobs-buttonPause" color="white" size="1em" />
      </div>

      <div
        className={`${classIcons} bg-danger`}
        onClick={handleClick("cancel")}
      >
        <Cancel data-gaelo-flow="jobs-buttonCancel" color="white" size="1em" />
      </div>
    </div>
  );
};

export default JobActions;
