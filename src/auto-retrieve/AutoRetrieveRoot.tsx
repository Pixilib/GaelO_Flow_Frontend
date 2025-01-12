import QueryRoot from "./query/QueryRoot";
import { Tab, Tabs } from "../ui";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ResultsRoot from "./results/ResultsRoot";
import TaskRoot from "./task/TaskRoot";
import { QueryResult } from "../utils/types";
import { useState } from "react";

const AutoRetrieveRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [studiesResults, setStudiesResults] = useState<QueryResult[]>([]);
  const [seriesResults, setSeriesResults] = useState<QueryResult[]>([]);

  const handleTabClick = (tab: string) => {
    navigate(tab);
  };

  const studyResultsHandler = (answers: QueryResult[]) => {
    setStudiesResults(studyResults=>[...studyResults, ...answers]);
  };

  const seriesResultsHandler = (answers: QueryResult[]) => {
    setSeriesResults(seriesResults=>[...seriesResults, ...answers]);
  }

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
          active={location.pathname.includes("/auto-retrieve/results")}
          onClick={() => handleTabClick("/auto-retrieve/results/studies")}
        />
        <Tab
          title="Robot"
          active={location.pathname.endsWith("/auto-retrieve/task")}
          onClick={() => handleTabClick("/auto-retrieve/task")}
        />
      </Tabs>
      <div>
        <Routes>
          <Route path="/" element={<QueryRoot onStudyResults={studyResultsHandler} onSeriesResults={seriesResultsHandler} />} />
          <Route path="/results/*" element={<ResultsRoot studiesResults={studiesResults} seriesResults={seriesResults}/>} />
          <Route path="/task" element={<TaskRoot />} />
        </Routes>
      </div>
    </div>
  );
};

export default AutoRetrieveRoot;
