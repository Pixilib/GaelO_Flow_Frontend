import { useSelector } from "react-redux";
import { RootState } from "./store";
import WelcomeRoot from "./welcome/WelcomeRoot";
import RootApp from "./root/RootApp";
import { IStaticMethods } from "preline/preline";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const location = useLocation();
  const [isDark, setDark] = useState(localStorage.getItem('theme') === 'dark')

  async function loadPreline() {
    return import('preline/dist/index.js');
  }

  useEffect(() => {
    const initPreline = async () => {
      await loadPreline();

      if (
        window.HSStaticMethods &&
        typeof window.HSStaticMethods.autoInit === 'function'
      ) {
        window.HSStaticMethods.autoInit();
      }
    };

    initPreline();
  }, [location.pathname]);

  useEffect(() => {
    window.onstorage = () => {
      const isDark = localStorage.getItem('theme') === 'dark';
      setDark(isDark);
    };
  }, []);

  return (
    <div className={`w-screen h-screen ${isDark ? 'dark' : ''}`}>
      {isLogged ? <RootApp /> : <WelcomeRoot />}
    </div>
  )
}
export default App;
