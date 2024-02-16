
import Sun from '../assets/sun.svg?react';
import Moon from '../assets/moon.svg?react';

type ToggleSwitchProps = {
  isToggled: boolean;
  onToggle: () => void; // tu peux détailler davantage le type si nécessaire
}

const ToggleSwitch = ({ isToggled, onToggle }: ToggleSwitchProps) => {
  return (
    <label className="flex cursor-pointer items-center">
      {/* Le vrai input checkbox caché */}
      <input
        data-gaelo-flow="toggle-switch"
        type="checkbox"
        className="sr-only"
        checked={isToggled}
        onChange={onToggle}
        aria-labelledby="Light and Dark mode switch"
      />
      {/* Le design du switch */}
      <div
        className={`duration-500 relative flex h-7 w-16 items-center rounded-full pe-3
       transition-colors ease-in-out 
        ${isToggled ? 'justify-end bg-primary-active' : 'justify-start rounded-full bg-primary-hover'
          }`}
      >
        {/* Le cercle du toggle avec l'icône du soleil ou de la lune */}
        <div
          className={`duration-200 flex size-6
           items-center justify-center rounded-full transition-opacity- shadow transition-all ease-in-out
            ${isToggled ? 'translate-x-2 ' : 'translate-x-0 bg-slate-100'
            }`}
        >
          {/* Affiche l'icône correspondante selon l'état du switch */}
          {isToggled ? (
            <Moon className="size-4" />
          ) : (
            <Sun className="size-4" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
