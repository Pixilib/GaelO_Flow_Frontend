import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SideBar } from "../RenderComponents/NavBar/SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/AdminRoot";

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen">
      <div className="grow-0">
        <SideBar onLogout={handleLogout} />
      </div>
      <div className="grow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admin/*" element={<AdminRoot />} />
        </Routes>
      </div>
    </div>
  );
};

export default RootApp;
