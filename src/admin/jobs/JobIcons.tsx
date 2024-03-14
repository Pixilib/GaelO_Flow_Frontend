import { FaRedo, FaPlay, FaPause, FaTimes } from 'react-icons/fa';

function JobIcons() {
  return (
    <div>
      {/* Icone de rechargement */}
      <FaRedo color="blue" size="1em" />
      
      {/* Icone de lecture */}
      <FaPlay color="green" size="1em" />
      
      {/* Icone de pause */}
      <FaPause color="yellow" size="1em" />
      
      {/* Icone de fermeture */}
      <FaTimes color="red" size="1em" />
    </div>
  );
}

export default JobIcons;
