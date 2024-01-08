import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import "./index.css";
import { RootState } from "./store";
import RootApp from "./RootComponents/RootApp";



function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  if (isLogged) return <RootApp />;
  else return <Welcome />;
}

export default App;