import QueryRoot from "./query/QueryRoot";
import { Tab, Tabs } from "../ui";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ResultsRoot from "./results/ResultsRoot";

const AutoRetrieveRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    navigate(tab);
  };

  return (
    <div
      className="shadow-md bg-almond dark:bg-neutral-500 rounded-xl space-y-3"
      data-gaelo-flow="import-create-root"
    >
      <Tabs className="bg-primary rounded-t-xl">
        <Tab
          title="Queries"
          active={location.pathname.endsWith("/auto-retrieve")}
          onClick={() => handleTabClick("/auto-retrieve")}
        />
        <Tab
          title="Results"
          active={location.pathname.endsWith("/auto-retrieve/results")}
          onClick={() => handleTabClick("/auto-retrieve/results")}
        />
      </Tabs>
      <div>
        <Routes>
          <Route path="/" element={<QueryRoot />} />
          <Route path="/results" element={<ResultsRoot />} />
        </Routes>
      </div>
    </div>
  );
};

export default AutoRetrieveRoot;
