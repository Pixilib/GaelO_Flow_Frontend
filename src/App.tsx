import { useSelector } from "react-redux";
import { RootState } from "./store";
import WelcomeRoot from "./welcome/WelcomeRoot";
import RootApp from "./root/RootApp";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  
  return (
    <div className="h-screen w-screen">
      {isLogged ? <RootApp  /> : <WelcomeRoot />}
    </div>
  )
}
export default App;
