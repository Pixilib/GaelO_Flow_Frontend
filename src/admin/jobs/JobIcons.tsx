import { FaRedo, FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import { postJobsAction } from '../../services/jobs';

type JobIconsProps = {
  jobId: string;
  onAction: (jobId: string, action: postJobsAction) => void;
};

const JobIcons= ({jobId, onAction}:JobIconsProps) => {
  const handleClick = (action: postJobsAction) => (e:React.MouseEvent) => {
    e.stopPropagation();
    onAction(jobId, action);
  };
  const classIcons = "inline-flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110";
  return (
    <div className="flex space-x-3">
      {/* Icone de rechargement */}
      <div className={`${classIcons} bg-primary`} onClick={handleClick('resubmit')}>
        <FaRedo color="white" size="1em" />
      </div>
      
      {/* Icone de lecture */}
      <div className={`${classIcons} bg-success`} onClick={handleClick('resume')}>
      <FaPlay color="white" size="1em" />
      </div>
      
      {/* Icone de pause */}
      <div className={`${classIcons} bg-[#DFB520]`} onClick={handleClick('pause')}>
      <FaPause color="white" size="1em" />
      </div>
      
      {/* Icone de fermeture */}
      <div className={`${classIcons} bg-danger`} onClick={handleClick('cancel')}>
      <FaTimes color="white" size="1em" />
      </div>
    </div>
  );
}

export default JobIcons;
