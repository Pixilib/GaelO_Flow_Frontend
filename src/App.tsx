import { useSelector } from "react-redux";
import { RootState } from "./store";
import WelcomeRoot from "./welcome/WelcomeRoot";
import RootApp from "./root/RootApp";
import "preline/preline";
import { IStaticMethods } from "preline/preline";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);


  return (
    <div className="w-screen h-screen">
      {isLogged ? <RootApp /> : <WelcomeRoot />}
    </div>
  )
}
export default App;
