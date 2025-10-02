import { useEffect, useState } from "react";
import { Moon, Sun } from "../icons";


const ToggleDarkMode = ()  => {
  const [checked, setChecked] = useState<boolean>(localStorage.getItem('theme') === 'dark');

  const handleClick = () => {
    const newValue = !checked;
    setChecked(newValue);
  };

  useEffect(()=>{
    localStorage.setItem('theme', checked ? 'dark' : 'light')
    window.dispatchEvent(new Event("storage"));
  }, [checked])

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
        data-gaelo-flow="header-darkmode"
        className={`relative flex items-center h-7 w-14 rounded-full transition-colors d ${
          checked ? "dark:bg-neutral-700" : "bg-primary-light"
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
            <Moon size={20} color="#374151" />
          ) : (
            <Sun size={20} color="#FFA500" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleDarkMode;
