import { useSelector } from "react-redux";
import WelcomeRoot from "./welcome/WelcomeRoot";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import "./index.css";
import OrthancCard from "./admin/general/OrthancCard";
function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
return(
  <OrthancCard/>
)
    return (
  <div className="w-screen h-screen">
    {isLogged ? <RootApp /> : <WelcomeRoot />}
  </div>
 )

}

export default App;
