import { useSelector } from "react-redux";
import { RootState } from "./store";
import WelcomeRoot from "./welcome/WelcomeRoot";
import RootApp from "./root/RootApp";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  const role = useSelector((state: RootState) => state.user?.role?.Name ?? "No role");
  console.log(role);

  return (
    <div className="w-screen h-screen">
      {isLogged ? <RootApp /> : <WelcomeRoot />}
    </div>
  )
}
export default App;
