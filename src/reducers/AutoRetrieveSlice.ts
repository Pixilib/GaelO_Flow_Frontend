import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { QueryStudy } from "../auto-retrieve/types";
import { QueryResultSeries, QueryResultStudy } from "../utils/types";

export type AutoRetrieveState = {
  queries: (QueryStudy & { selected: boolean })[];
  studyResults: (QueryResultStudy & { selected: boolean })[];
  seriesResults: (QueryResultSeries & { selected: boolean })[];
  basket: Array<
    | (QueryResultSeries & { id: string; selected: boolean })
    | (QueryResultStudy & { id: string; selected: boolean })
  >;
};

const initialState: AutoRetrieveState = {
  queries: [],
  studyResults: [],
  seriesResults: [],
  basket: [],
};

type ChangeSelectionPayload = Record<number | string, boolean>;

type RemoveQueryPayload = {
  id: number;
};

type RemoveBasketPayload = {
  id: string;
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
      state.queries.push({ ...study, selected: false });
    },
    updateQueriesSelection: (
      state,
      action: PayloadAction<ChangeSelectionPayload>
    ) => {
      state.queries.forEach((query) => {
        query.selected = action.payload?.[query.id] ?? false;
      });
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
      if (action.payload.seriesInstanceUID) {
        const seriesInstanceUIDs = state.basket.map(
          (item) => item?.seriesInstanceUID
        );
        if (seriesInstanceUIDs.includes(action.payload.seriesInstanceUID)) {
          return;
        }
      } else {
        const studyInstanceUIDs = state.basket.map(
          (item) => item?.studyInstanceUID
        );
        if (studyInstanceUIDs.includes(action.payload.studyInstanceUID)) {
          return;
        }
      }
      state.basket.push({
        ...action.payload,
        id: action.payload.answerId + "/" + action.payload.answerNumber,
        selected: false,
      });
    },
    removeStudyOrSeriesFromBasket: (
      state,
      action: PayloadAction<RemoveBasketPayload>
    ) => {
      state.basket = state.basket.filter((ressource) => {
        return ressource.id !== action.payload.id;
      });
    },
    updateBasketSelection: (
      state,
      action: PayloadAction<ChangeSelectionPayload>
    ) => {
      state.basket.forEach((query) => {
        query.selected = action.payload?.[query.id] ?? false;
      });
    },
    addStudyResult: (state, action: PayloadAction<QueryResultStudy>) => {
      const resultStudy = action.payload;
      state.studyResults.push({ ...resultStudy, selected: false });
    },
    updateStudyResultSelection: (
      state,
      action: PayloadAction<ChangeSelectionPayload>
    ) => {
      state.studyResults.forEach((query) => {
        query.selected = action.payload?.[query.studyInstanceUID] ?? false;
      });
    },
    updateSeriesResultSelection: (
      state,
      action: PayloadAction<ChangeSelectionPayload>
    ) => {
      state.seriesResults.forEach((query) => {
        query.selected = action.payload?.[query.seriesInstanceUID] ?? false;
      });
    },
    removeStudyResults: (state, action: PayloadAction<RemoveResultPayload>) => {
      state.studyResults = state.studyResults.filter((study) => {
        return study.studyInstanceUID !== action.payload.instanceUID;
      });
    },
    removeSeriesResults: (
      state,
      action: PayloadAction<RemoveResultPayload>
    ) => {
      state.seriesResults = state.seriesResults.filter((study) => {
        return study.seriesInstanceUID !== action.payload.instanceUID;
      });
    },
    addSeriesResult: (state, action: PayloadAction<QueryResultSeries>) => {
      const resultSeries = action.payload;
      state.seriesResults.push({ ...resultSeries, selected: false });
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
    clearBasket: (state) => {
      state.basket = [];
    },
  },
});
export const {
  addQuery,
  removeQuery,
  addStudyResult,
  updateStudyResultSelection,
  updateBasketSelection,
  addSeriesResult,
  updateSeriesResultSelection,
  addStudyOrSeriesToBasket,
  updateQueriesSelection,
  removeStudyOrSeriesFromBasket,
  editQuery,
  clearQueries,
  clearStudyResults,
  clearSeriesResults,
  clearBasket,
  removeStudyResults,
  removeSeriesResults,
} = autoRetrieveSlice.actions;

export default autoRetrieveSlice.reducer;
