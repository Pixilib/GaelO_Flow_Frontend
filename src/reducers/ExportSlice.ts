import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Series, Study } from '../utils/types';

export interface ExportState {
    studies: {
        [studyId: string]: Study
    }
    series: {
        [seriesId: string]: Series
    }
}

type AddExportPayload = {
    study: Study
    series: Series
}

type RemoveExportPayload = {
    seriesId: string
}

const initialState: ExportState = {
    studies: {},
    series: {},
}

const exportSlice = createSlice({
    name: 'export',
    initialState,
    reducers: {
        addSeriesToExportList: (state, action: PayloadAction<AddExportPayload>) => {
            const series = action.payload.series;
            const study = action.payload.study;
            state.series[series.id] = series
            state.studies[study.id] = study
        },
        flushExportList: (state) => {
            state.series = {}
            state.studies = {}
        },
        removeSeriesFromExportList: (state, action: PayloadAction<RemoveExportPayload>) => {
            const seriesId = action.payload.seriesId;
            const seriesToDelete = state.series[seriesId]
            //If delete series is the last series in the study, delete the study
            if (Object.values(state.series).filter(series => series.parentStudy === seriesToDelete.parentStudy).length === 1) {
                delete state.studies?.[seriesToDelete.parentStudy]
            }
            delete state.series?.[seriesId]
        }
    }
})
export const { addSeriesToExportList, flushExportList, removeSeriesFromExportList } = exportSlice.actions;
export default exportSlice.reducer;
