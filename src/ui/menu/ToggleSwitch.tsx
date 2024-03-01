
import Sun from '../../assets/sun.svg?react';
import Moon from '../../assets/moon.svg?react';

type ToggleSwitchProps = {
  isToggled: boolean;
  onToggle: () => void;
}

const ToggleSwitch = ({ isToggled, onToggle }: ToggleSwitchProps) => {
  const handleClick = (event:any) => {
    event.stopPropagation();
  }
  return (
    <label className="flex cursor-pointer items-center">
      {/* The real hidden checkbox input */}
      <input
        data-gaelo-flow="toggle-switch"
        type="checkbox"
        className="sr-only"
        checked={isToggled}
        onChange={onToggle}
        onClick={handleClick}
        aria-labelledby="Light and Dark mode switch"
      />
      {/* switch design */}
      <div
        className={`relative flex h-7 w-16 items-center rounded-full pe-3 transition-colors
       duration-500 ease-in-out 
        ${isToggled ? 'justify-end bg-primary-active' : 'justify-start rounded-full bg-primary-hover'
          }`}
      >
        {/* Circle toogle with moon or sun */}
        <div
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`transition-opacity- flex size-6
           items-center justify-center rounded-full shadow transition-all duration-200 ease-in-out
            ${isToggled ? 'translate-x-2 ' : 'translate-x-0 bg-slate-100'
            }`}
        >
          {/*Display icon according to toogle switch  */}
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
