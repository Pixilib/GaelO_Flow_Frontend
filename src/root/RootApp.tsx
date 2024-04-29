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

  const title = useMemo(() => {
    const titlePath: { [key: string]: string } = {
      "/administration/general": "General",
      "/administration/modalities": "Modalities",
      "/administration/jobs": "Jobs",
      "/administration/labels": "Labels",
      "/administration/queues":"Queues",
      "/administration/queues/retrieve":"Queues",
      "/administration/queues/anonymize":"Queues",
      "/administration/queues/delete":"Queues",
      "/administration/peers": "Peers",
      "/administration/users": "Users",
      "/administration/users/local": "Users",
      "/administration/users/local/create": "Users",
      "/administration/users/local/edit": "Users",
      "/administration/users/roles": "Users",
      "/Orthanc Content": "Orthanc Content",
      "/import": "Import",
      "/query": "Query",
      "/users": "Users",
      "/mydicom": "My Dicom",
      "/auto-retrieve": "Auto retrieve",
      "/": "Home"
    };
    return titlePath[location.pathname];
  }, [location.pathname])

  return (
    <div className="flex bg-white size-full">
      <SideBar openItem={openItem} setOpenItem={setOpenItem} onLogout={handleLogout} />
      <div className="flex flex-col flex-1 bg-secondaryLight">
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
