import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QueryStudy } from "../auto-retrieve/types";
import { QueryResultSeries, QueryResultStudy } from "../utils/types";

export type AutoRetrieveState = {
  queries: QueryStudy[];
  studyResults: QueryResultStudy[];
  seriesResults: QueryResultSeries[];
  basket: Array<QueryResultSeries | QueryResultStudy>;
};

const initialState: AutoRetrieveState = {
  queries: [],
  studyResults: [],
  seriesResults: [],
  basket: [],
};

type RemoveQueryPayload = {
  id: number;
};

type RemoveResultPayload = {
  instanceUID: string;
};

type EditQueryPayload = {
  id: number;
  key: string;
  value: string | number;
};

const autoRetrieveSlice = createSlice({
  name: "autoRetrieve",
  initialState,
  reducers: {
    addQuery: (state, action: PayloadAction<QueryStudy>) => {
      const study = action.payload;
      console.log(study);
      state.queries.push(study);
    },
    removeQuery: (state, action: PayloadAction<RemoveQueryPayload>) => {
      state.queries = state.queries.filter(
        (query) => query.id !== action.payload.id
      );
    },
    editQuery: (state, action: PayloadAction<EditQueryPayload>) => {
      const { id, key, value } = action.payload;
      const query = state.queries.find((query) => query.id === id);
      if (query) {
        query[key] = value;
      }
    },
    addStudyOrSeriesToBasket: (
      state,
      action: PayloadAction<QueryResultStudy | QueryResultSeries>
    ) => {
      console.log(action.payload);
      if(action.payload.seriesInstanceUID){
        const seriesInstanceUIDs = state.basket.map( (item) => item?.seriesInstanceUID)
        if(seriesInstanceUIDs.includes(action.payload.seriesInstanceUID)){
          return;
        }
      }else{
        const studyInstanceUIDs = state.basket.map( (item) => item?.studyInstanceUID)
        if(studyInstanceUIDs.includes(action.payload.studyInstanceUID)){
          return;
        }
      }
      state.basket.push(action.payload);
    },
    removeStudyOrSeriesFromBasket: (
      state,
      action: PayloadAction<RemoveResultPayload>
    ) => {
      state.basket = state.basket.filter((ressource) => {
        if (ressource.seriesInstanceUID) {
          return ressource.seriesInstanceUID !== action.payload.instanceUID;
        } else {
          return ressource.studyInstanceUID !== action.payload.instanceUID;
        }
      });
    },
    addStudyResult: (state, action: PayloadAction<QueryResultStudy>) => {
      const resultStudy = action.payload;
      state.studyResults.push(resultStudy);
    },
    addSeriesResult: (state, action: PayloadAction<QueryResultSeries>) => {
      const resultSeries = action.payload;
      state.seriesResults.push(resultSeries);
    },
    clearQueries: (state) => {
      state.queries = [];
    },
    clearStudyResults: (state) => {
      state.studyResults = [];
    },
    clearSeriesResults: (state) => {
      state.seriesResults = [];
    },
    clearBasket : (state) => {
      state.basket = [];
    }
  },
});
export const {
  addQuery,
  removeQuery,
  addStudyResult,
  addSeriesResult,
  addStudyOrSeriesToBasket,
  removeStudyOrSeriesFromBasket,
  editQuery,
  clearQueries,
  clearStudyResults,
  clearSeriesResults,
  clearBasket
} = autoRetrieveSlice.actions;

export default autoRetrieveSlice.reducer;
