import { useSelector } from "react-redux";
import WelcomeRoot from "./welcome/WelcomeRoot";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import "./index.css";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

return (

  <div className="h-screen w-screen">
    {isLogged ? <RootApp /> : <WelcomeRoot />}
  </div>
 )

}

export default App;
