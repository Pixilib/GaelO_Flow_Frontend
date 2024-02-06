import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import { Banner } from "../RenderComponents/Banner/Banner";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";



const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex w-full h-full">
      <SideBar onLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Banner title={"Home"} />

        <div className="flex h-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin/*" element={<AdminRoot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
