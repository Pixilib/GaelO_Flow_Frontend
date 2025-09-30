import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate, unstable_usePrompt as usePrompt } from "react-router";

import { logout, setCanExitPage } from "../reducers/UserSlice";

import SideBar from "./SideBar";
import Dashboard from "./dashboard/Dashboard";
import AdminRoot from "../admin/AdminRoot";
import Header from "./Header";
import QueryRoot from "../query/QueryRoot";
import ImportCreateRoot from "../import/ImportCreateRoot";
import ContentRoot from "../content/ContentRoot";
import DatasetRoot from "../datasets/DatasetRoot";
import DeleteRoot from "../delete/DeleteRoot";
import AnonymizeRoot from "../anonymize/AnonymizeRoot";
import ExportRoot from "../export/ExportRoot";
import AutoRoutingRoot from "../autorouting/AutoRoutingRoot";
import AutoRetrieveRoot from "../auto-retrieve/AutoRetrieveRoot";
import HelpRoot from "../help/HelpRoot";
import { RootState } from "../store";

const titlePath: { [key: string]: string } = {
  "/administration/general/redis": "General",
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
  "/auto-retrieve/results/studies": "Auto retrieve",
  "/auto-retrieve/results/series": "Auto retrieve",
  "/auto-retrieve/basket": "Auto retrieve",
  "/auto-retrieve/task": "Auto retrieve",
  "/auto-routing": "Auto routing",
  "/datasets": "Datasets",
  "/": "Home",
};

const RootApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const canExitPage = useSelector((state: RootState) => state.user.canExitPage)
  const exitMessage = useSelector((state: RootState) => state.user.message)

  usePrompt(
    {
      when: !canExitPage,
      message : exitMessage,
    }
  )

  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const title = useMemo(() => {
    return titlePath[location.pathname];
  }, [location.pathname]);

  return (
    <div className="flex w-screen h-screen bg-white dark:bg-neutral-800">
      <SideBar
        openItem={openItem}
        setOpenItem={setOpenItem}
        onLogout={handleLogout}
      />
      <div className="flex flex-col flex-1 overflow-auto bg-slate-100 dark:bg-neutral-700 custom-scrollbar">
        <Header title={title} />
        <div className="mx-6 my-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/administration">
              <Route path="*" element={<AdminRoot />} />
            </Route>
            <Route path="/query" element={<QueryRoot />} />
            <Route path="/auto-retrieve/*" element={<AutoRetrieveRoot />} />
            <Route path="/import/*" element={<ImportCreateRoot />} />
            <Route path="/content" element={<ContentRoot />} />
            <Route path="/datasets" element={<DatasetRoot />} />
            <Route path="/anonymize" element={<AnonymizeRoot />} />
            <Route path="/export" element={<ExportRoot />} />
            <Route path="/delete" element={<DeleteRoot />} />
            <Route path="/auto-routing" element={<AutoRoutingRoot />} />
            <Route path="/help" element={<HelpRoot />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default RootApp;
