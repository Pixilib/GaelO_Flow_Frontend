import { useEffect, useState } from "react";
import { Moon, Sun } from "../icons";
import { ToggleSwitch } from "../ui";


const ToggleDarkMode = () => {
  const [checked, setChecked] = useState<boolean>(localStorage.getItem('theme') === 'dark');

  const handleClick = () => {
    const newValue = !checked;
    setChecked(newValue);
  };

  useEffect(() => {
    localStorage.setItem('theme', checked ? 'dark' : 'light')
    window.dispatchEvent(new Event("storage"));
  }, [checked])

  return (
    <ToggleSwitch
      checked={checked}
      className={` ${checked ? "dark:bg-neutral-700" : "bg-primary-light"}`}
      onChange={handleClick}
      data-gaelo-flow="header-darkmode"
    >
      {checked ? (
        <Moon size={20} color="#374151" />
      ) : (
        <Sun size={20} color="#FFA500" />
      )}
    </ToggleSwitch>

  );
};

export default ToggleDarkMode;
