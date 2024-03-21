import { FaRedo, FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import { postJobsAction } from '../../services/jobs';



type JobIconsProps = {
  jobId: string;
  onAction: (jobId: string, action: postJobsAction) => void;
};
const JobIcons= ({jobId, onAction}:JobIconsProps) => {
  const classIcons = "inline-flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110";
  return (
    <div className="flex space-x-3">
      {/* Icone de rechargement */}
      <div className={`${classIcons} bg-primary`} onClick={()=> onAction(jobId,'resubmit')}>
        <FaRedo color="white" size="1em" />
      </div>
      
      {/* Icone de lecture */}
      <div className={`${classIcons} bg-success`} onClick={()=> onAction(jobId,'resume')}>
      <FaPlay color="white" size="1em" />
      </div>
      
      {/* Icone de pause */}
      <div className={`${classIcons} bg-[#DFB520]`} onClick={()=> onAction(jobId,'pause')}  >
      <FaPause color="white" size="1em" />
      </div>
      
      {/* Icone de fermeture */}
      <div className={`${classIcons} bg-danger`} onClick={()=> onAction(jobId,'cancel')}>
      <FaTimes color="white" size="1em" />
      </div>
    </div>
  );
}

export default JobIcons;
