import { useSelector } from "react-redux";
import WelcomeRoot from "./welcome/WelcomeRoot";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import "./index.css";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  if (isLogged) return <RootApp />;
  else return <WelcomeRoot />;
}

export default App;
