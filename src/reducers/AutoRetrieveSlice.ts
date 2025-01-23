import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QueryStudy } from "../auto-retrieve/types";
import { QueryResultSeries, QueryResultStudy } from "../utils/types";

export type AutoRetrieveState = {
  queries: QueryStudy[];
  studyResults: QueryResultStudy[];
  seriesResults: QueryResultSeries[];
};

const initialState: AutoRetrieveState = {
  queries: [],
  studyResults: [],
  seriesResults: [],
};

type RemoveQueryPayload = {
  id: number;
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
      console.log(study)
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
  },
});
export const {
  addQuery,
  removeQuery,
  addStudyResult,
  addSeriesResult,
  editQuery,
  clearQueries,
  clearStudyResults,
  clearSeriesResults,
} = autoRetrieveSlice.actions;

export default autoRetrieveSlice.reducer;
