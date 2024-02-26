import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../reducers/UserSlice";
import { Route, Routes, useNavigate } from "react-router-dom";

import { SideBar } from "../layout/SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/general/AdminRoot";
import Header from "../layout/Header";

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleSwitchMode = () => {
    setIsToggled(!isToggled);
  };
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="flex size-full">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} />
      <div className="flex flex-1 flex-col">
        <Header openItem={openItem} setOpenItem={setOpenItem} isToggled={isToggled} onSwicthMode={handleSwitchMode} />

        <div className="flex">
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
