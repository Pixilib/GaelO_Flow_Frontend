import { useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import QueryRoot from "./query/QueryRoot";
import ResultsRoot from "./results/ResultsRoot";
import TaskRoot from "./task/TaskRoot";
import BasketRoot from "./basket/BasketRoot";
import { addSeriesResult, addStudyResult, clearSeriesResults } from "../reducers/AutoRetrieveSlice";

import { Tab, Tabs } from "../ui";
import { QueryPayload, QueryResultSeries, QueryResultStudy } from "../utils/types";
import { dicomDateQueryStringFromDateFromDateTo } from "../utils";
import { queryModality } from "../services";
import { RootState, store } from "../store";

const AutoRetrieveRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queries = useSelector((state: RootState) => state.autoRetrieve.queries);
  const studiesResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);

  const handleTabClick = (tab: string) => {
    navigate(tab);
  };

  const studyResultsHandler = (answers: QueryResultStudy[]) => {
    answers.forEach((study) => {
      store.dispatch(addStudyResult(study));
    })
  };

  const seriesResultsHandler = (answers: QueryResultSeries[]) => {
    answers.forEach((series) => {
      store.dispatch(addSeriesResult(series));
    })
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
    clearSeriesResults()
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
          title="Basket"
          active={location.pathname.includes("/auto-retrieve/basket")}
          onClick={() => handleTabClick("/auto-retrieve/basket")}
        />
        <Tab
          title="Robot"
          active={location.pathname.endsWith("/auto-retrieve/task")}
          onClick={() => handleTabClick("/auto-retrieve/task")}
        />
      </Tabs>
      <div>
        <Routes>
          <Route path="/" element={<QueryRoot onStartStudyQueries={handleStartStudyQueries} queries={queries} onStudyResults={studyResultsHandler} onSeriesResults={seriesResultsHandler} />} />
          <Route path="/results/*" element={<ResultsRoot
            onStartSeriesQueries={handleStartSeriesQueries}
          />} />
          <Route path="/basket" element={<BasketRoot />} />
          <Route path="/task" element={<TaskRoot />} />
        </Routes>
      </div>
    </div>
  );
};

export default AutoRetrieveRoot;
