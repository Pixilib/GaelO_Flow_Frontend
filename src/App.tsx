import { useSelector } from "react-redux";
import { RootState } from "./store";
import WelcomeRoot from "./welcome/WelcomeRoot";
import RootApp from "./root/RootApp";
import RedisCard from "./admin/general/RedisCard";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  return (
    <RedisCard/>
  )
  return (
    <div className="w-screen h-screen">
      {isLogged ? <RootApp  /> : <WelcomeRoot />}
    </div>
  )
}
export default App;
