import { useSelector } from "react-redux";
import Welcome from "./Welcome";
import "./index.css";
import { RootState } from "./store";
import RootApp from "./root/RootApp";




function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  
return (

  (isLogged) ?  <RootApp /> : <Welcome />

)

}

export default App;