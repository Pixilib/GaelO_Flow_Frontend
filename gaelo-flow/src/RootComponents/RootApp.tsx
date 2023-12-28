import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import Dashboard from "./Dashboard";

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="flex w-full h-screen">
      <SideBar />
      <div className="h-full w-full">
        <Dashboard />
      </div>
    </div>
  );
};

export default RootApp;
