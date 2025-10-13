import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation, useNavigate } from "react-router";

import QueryRoot from "./query/QueryRoot";
import ResultsRoot from "./results/ResultsRoot";
import TaskRoot from "./task/TaskRoot";
import BasketRoot from "./basket/BasketRoot";
import { addSeriesResult, addStudyResult, clearSeriesResults } from "../reducers/AutoRetrieveSlice";

import { ProgressBar, Tab, Tabs } from "../ui";
import { QueryPayload, QueryResultSeries, QueryResultStudy } from "../utils/types";
import { dicomDateQueryStringFromDateFromDateTo } from "../utils";
import { queryModality } from "../services";
import { RootState, store } from "../store";
import { setCanExitPage } from "../reducers/UserSlice";
import { useTranslation } from "react-i18next";
import AutoRetrieveTour from "../tour/tours/auto-retrieve/AutoRetrieveTour";

const AutoRetrieveRoot = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mounted = useRef(false);
  const queries = useSelector((state: RootState) => state.autoRetrieve.queries);
  const studiesResults = useSelector((state: RootState) => state.autoRetrieve.studyResults);
  const {t} = useTranslation()

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      dispatch(setCanExitPage({ canExitPage: true, message: "" }))
    }
  }, [])

  const [progressQueriesStudies, setProgressQueriesStudies] = useState(0);
  const [progressQueriesSeries, setProgressQueriesSeries] = useState(0);
  const [isQuerying, setIsQuerying] = useState(false);

  useEffect(() => {
    dispatch(setCanExitPage({ canExitPage: !isQuerying, message: "Queries are processing, changing page will interupt them." }))
  }, [isQuerying])

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
    setIsQuerying(true)
    setProgressQueriesStudies(0)
    const queriesReady = queries.filter((query) => query.aet)
    for (const queryRow of queriesReady) {
      const query: QueryPayload = {
        Level: 'Study',
        Query: {
          PatientName: queryRow.patientName,
          PatientID: queryRow.patientId,
          StudyDescription: queryRow.studyDescription,
          AccessionNumber: queryRow.accessionNumber,
          StudyDate: dicomDateQueryStringFromDateFromDateTo(queryRow.dateFrom, queryRow.dateTo),
          Modality: queryRow.modalitiesInStudy
        }
      }
      const answer = await (queryModality(queryRow.aet, query) as Promise<QueryResultStudy[]>)
      studyResultsHandler(answer)
      setProgressQueriesStudies((progress) => progress + (100 / queriesReady.length))
    }
    setProgressQueriesStudies(0)
    setIsQuerying(false)
  }

  const handleStartSeriesQueries = async () => {
    setIsQuerying(true)
    clearSeriesResults()
    setProgressQueriesSeries(0)
    for (const studyResult of studiesResults) {
      const query: QueryPayload = {
        Level: 'Series',
        Query: {
          StudyInstanceUID: studyResult.studyInstanceUID,
        }
      }
      const answer = await (queryModality(studyResult.originAET, query) as Promise<QueryResultSeries[]>)
      seriesResultsHandler(answer)
      setProgressQueriesSeries((progress) => Math.round(progress + (100 / studiesResults.length)))
    }
    setProgressQueriesSeries(0)
    setIsQuerying(false)
  }

  return (
    <div
      className="shadow-md bg-almond dark:bg-neutral-500 rounded-xl space-y-3"
      data-gaelo-flow="import-create-root"
    >
     <div className="w-full flex justify-end m-1">
          <AutoRetrieveTour />
      </div>
      <Tabs className="bg-primary rounded-t-xl">
        <Tab
          title="Queries"
          active={location.pathname.endsWith("/auto-retrieve")}
          onClick={() => handleTabClick("/auto-retrieve")}
        />
        <Tab
          title={t("auto-retrieve.query.results")}
          active={location.pathname.includes("/auto-retrieve/results")}
          onClick={() => handleTabClick("/auto-retrieve/results/studies")}
        />
        <Tab
          title={t("auto-retrieve.query.basket")}
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
          <Route path="/results">
            <Route path="*" element={<ResultsRoot
              onStartSeriesQueries={handleStartSeriesQueries}
            />} />
          </Route>
          <Route path="/basket" element={<BasketRoot />} />
          <Route path="/task" element={<TaskRoot />} />
        </Routes>
      </div>
      <div className="flex flex-col gap-3">
        {progressQueriesStudies ? <ProgressBar progress={progressQueriesStudies} /> : null}
        {progressQueriesSeries ? <ProgressBar progress={progressQueriesSeries} /> : null}
      </div>
    </div>
  );
};

export default AutoRetrieveRoot;
