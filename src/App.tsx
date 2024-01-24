import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import "./index.css";
import { RootState } from "./store";
import RootApp from "./root/RootApp";
import General from "./admin/General";




function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  
return (

  <General/>
  
  )
  if (isLogged) return <RootApp />;
  else return <Welcome />;

}

export default App;