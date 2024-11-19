import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { logout } from "../reducers/UserSlice";

import SideBar from "./SideBar";
import Dashboard from "./Dashboard/Dashboard";
import AdminRoot from "../admin/AdminRoot";
import Header from "./Header";
import QueryRoot from "../query/QueryRoot";
import ImportCreateRoot from "../import/ImportCreateRoot";
import ContentRoot from "../content/ContentRoot";
import DatasetRoot from "../datasets/DatasetRoot";
import DeleteRoot from "../delete/DeleteRoot";
import AnonymizeRoot from "../anonymize/AnonymizeRoot";
import ExportRoot from "../export/ExportRoot";

const titlePath: { [key: string]: string } = {
  "/administration/general": "General",
  "/administration/modalities": "Modalities",
  "/administration/jobs": "Jobs",
  "/administration/labels": "Labels",
  "/administration/queues": "Queues",
  "/administration/queues/retrieve": "Queues",
  "/administration/queues/anonymize": "Queues",
  "/administration/queues/delete": "Queues",
  "/administration/peers": "Peers",
  "/administration/users/users": "Users",
  "/administration/users/roles": "Users",
  "/administration/users/oauth2": "Users",
  "/Orthanc Content": "Orthanc Content",
  "/import/upload": "Import Dicoms",
  "/import/create": "Create Dicoms",
  "/query": "Query",
  "/users": "Users",
  "/dataset": "DataSet",
  "/auto-retrieve": "Auto retrieve",
  "/auto-routing": "Auto routing",
  "/datasets": "Datasets",
  "/": "Home",
};

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
    return titlePath[location.pathname];
  }, [location.pathname]);

  return (
    <div className="flex w-screen h-screen bg-white">
      <SideBar
        openItem={openItem}
        setOpenItem={setOpenItem}
        onLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-neutral-800 custom-scrollbar">
        <Header title={title} />
        <div className="mx-6 my-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/administration/*" element={<AdminRoot />} />
            <Route path="/query" element={<QueryRoot />} />
            <Route path="/import/*" element={<ImportCreateRoot />} />
            <Route path="/orthanc-content" element={<ContentRoot />} />
            <Route path="/datasets" element={<DatasetRoot />} />
            <Route path="/anonymize" element={<AnonymizeRoot />} />
            <Route path="/export" element={<ExportRoot />} />
            <Route path="/delete" element={<DeleteRoot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
