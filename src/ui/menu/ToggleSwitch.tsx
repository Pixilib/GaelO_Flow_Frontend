import { TiWeatherNight } from "react-icons/ti";
import { RiSunFill } from "react-icons/ri";
import { useState } from "react";

type ToggleSwitchProps = {
  isToggled?: boolean;
  onToggle?: (isChecked: boolean) => void;
};

const ToggleSwitch = ({ isToggled, onToggle }: ToggleSwitchProps) => {
  const [checked, setChecked] = useState<boolean>(isToggled || false);

  const handleClick = () => {
    const newValue = !checked;
    setChecked(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      {/* The real hidden checkbox input */}
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={handleClick}
      />
      {/* switch design */}
      <div
        className={`relative flex items-center h-7 w-14 rounded-full transition-colors d ${
          checked ? "bg-primary-active" : "bg-primary-light"
        }`}
      >
        {/* Circle toggle with moon or sun */}
        <div
          className={`absolute top-0 ${
            checked ? "right-0 translate-x-0.5" : "left-0 translate-x-0"
          } w-7 h-7 flex items-center justify-center rounded-full shadow-lg transition-transform duration-200 ease-in-out bg-white`}
        >
          {/* Display icon according to toggle switch */}
          {checked ? (
            <TiWeatherNight size={20} color="#374151" />
          ) : (
            <RiSunFill size={20} color="#FFA500" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
