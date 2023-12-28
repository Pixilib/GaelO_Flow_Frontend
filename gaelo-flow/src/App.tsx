import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import "./index.css";
import { RootState } from "./store";
import AppWelcomePage from "./RootComponents/AppWelcomePage";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);

  if (isLogged) return <AppWelcomePage />;
  else return <Welcome />;
}

export default App;
