import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { logout } from "../reducers/UserSlice";

import SideBar from "./SideBar";
import Dashboard from "./Dashboard";
import AdminRoot from "../admin/AdminRoot";
import Header from "./Header";

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const title = useMemo(()=> {
    const titlePath: { [key: string]: string } = {
      "/aets": "Aets",
      "/auto-retrieve": "Auto retrieve",
      "/import": "Import",
      "/external-endpoints": "External endpoints",
      "admin/jobs": "Jobs",
      "/labels": "Labels",
      "/mydicom": "My Dicom",
      "/Orthanc Content": "Orthanc Content",
      "/peers": "Peers",
      "/query": "Query",
      "/robot-tasks": "Robot & Tasks",
      "/users": "Users",
      "/": "Home"
    };
    return titlePath[location.pathname];
  }, [location.pathname])

  return (
    <div className="flex size-full bg-[#E9E5E4]">
      <div className="bg-white">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} />
      </div>
      <div className="flex flex-col flex-1">
        <Header
          title={title}
          openItem={openItem}
          setOpenItem={setOpenItem}
        />
        <div className="flex">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/administration/*" element={<AdminRoot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
export default RootApp;
