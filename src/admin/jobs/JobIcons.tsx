import { FaRedo, FaPlay, FaPause, FaTimes } from 'react-icons/fa';


const on = () => {
  console.log("Clicked");
}
const JobIcons= () => {
  const classIcons = "inline-flex items-center justify-center p-2 rounded-full transition-transform transform hover:scale-110";
  return (
    <div className="flex space-x-3">
      {/* Icone de rechargement */}
      <div className={`${classIcons} bg-primary`} onClick={on}>
        <FaRedo color="white" size="1em" />
      </div>
      
      {/* Icone de lecture */}
      <div className={`${classIcons} bg-success`} onClick={on}>
      <FaPlay color="white" size="1em" />
      </div>
      
      {/* Icone de pause */}
      <div className={`${classIcons} bg-[#DFB520]`} onClick={on}  >
      <FaPause color="white" size="1em" />
      </div>
      
      {/* Icone de fermeture */}
      <div className={`${classIcons} bg-danger`} onClick={on}>
      <FaTimes color="white" size="1em" />
      </div>
    </div>
  );
}

export default JobIcons;
