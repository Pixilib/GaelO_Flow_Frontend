import QueryRoot from "./query/QueryRoot";
import { Tab, Tabs } from "../ui";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ResultsRoot from "./results/ResultsRoot";
import TaskRoot from "./task/TaskRoot";
import { QueryPayload, QueryResultSeries, QueryResultStudy } from "../utils/types";
import { useState } from "react";
import { dicomDateQueryStringFromDateFromDateTo } from "../utils";
import { queryModality } from "../services";
import { QueryStudy } from "./types";

const AutoRetrieveRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [queries, setQueries] = useState<QueryStudy[]>([]);
  const [studiesResults, setStudiesResults] = useState<QueryResultStudy[]>([]);
  const [seriesResults, setSeriesResults] = useState<QueryResultSeries[]>([]);

  const handleTabClick = (tab: string) => {
    navigate(tab);
  };

  const handleQuerySeries = () => {
  };

  const studyResultsHandler = (answers: QueryResultStudy[]) => {
    setStudiesResults(studyResults => [...studyResults, ...answers]);
  };

  const seriesResultsHandler = (answers: QueryResultSeries[]) => {
    setSeriesResults(seriesResults => [...seriesResults, ...answers]);
  }

  const handleStartStudyQueries = async () => {
    for (const queryRow of queries) {
      const query: QueryPayload = {
        Level: 'Study',
        Query: {
          PatientName: queryRow.patientName,
          PatientID: queryRow.patientID,
          StudyDescription: queryRow.studyDescription,
          AccessionNumber: queryRow.accessionNumber,
          StudyDate: dicomDateQueryStringFromDateFromDateTo(queryRow.dateFrom, queryRow.dateTo),
          Modality: queryRow.modalitiesInStudy
        }
      }
      const answer = await (queryModality(queryRow.aet, query) as Promise<QueryResultStudy[]>)
      studyResultsHandler(answer)
    }
  }

  const handleStartSeriesQueries = async () => {
    setSeriesResults([])
    //Repopulate seriesResults
    for (const studyResult of studiesResults) {
      const query: QueryPayload = {
        Level: 'Series',
        Query: {
          StudyInstanceUID: studyResult.studyInstanceUID,
        }
      }
      const answer = await (queryModality(studyResult.originAET, query) as Promise<QueryResultSeries[]>)     
      seriesResultsHandler(answer)
    }
  }

  const handleClearStudyResults = () => {
    setStudiesResults([])
  }

  const handleClearSeriesResults = () => {
    setSeriesResults([])
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
          <Route path="/" element={<QueryRoot onStartStudyQueries = {handleStartStudyQueries} queries={queries} setQueries={setQueries} onStudyResults={studyResultsHandler} onSeriesResults={seriesResultsHandler} />} />
          <Route path="/results/*" element={<ResultsRoot studyResults={studiesResults} seriesResults={seriesResults} onStartSeriesQueries={handleStartSeriesQueries} onClearStudyResults={handleClearStudyResults} onClearSeriesResults={handleClearSeriesResults} />} />
          <Route path="/task" element={<TaskRoot />} />
        </Routes>
      </div>
    </div>
  );
};

export default AutoRetrieveRoot;
