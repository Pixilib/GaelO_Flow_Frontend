import { useSelector } from "react-redux";
import WelcomeRoot from "./welcome/WelcomeRoot";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import "./index.css";
import RedisCard from "./admin/general/RedisCard";
function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
return(
  <RedisCard/>
)
    return (
  <div className="w-screen h-screen">
    {isLogged ? <RootApp /> : <WelcomeRoot />}
  </div>
 )

}

export default App;
