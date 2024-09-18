import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Series } from '../utils/types';

export interface ExportState {
    series: {
        [seriesId: string]: {
            series: Series,
        }
    }
}

type AddExportPayload = {
    series: Series
}

type RemoveExportPayload = {
    seriesId: string
}

const initialState: ExportState = {
    series: {},
}

const exportSlice = createSlice({
    name: 'export',
    initialState,
    reducers: {
        addSeriesToExportList: (state, action: PayloadAction<AddExportPayload>) => {
            const series = action.payload.series;
            state.series[series.id] = {
                series: series,
            }
        },
        flushExportList: (state) => {
            state.series = {}
        },
        removeSeriesFromExportList: (state, action: PayloadAction<RemoveExportPayload>) => {
            const seriesId = action.payload.seriesId;
            delete state.series?.[seriesId]
        }
    }
})
export const { addSeriesToExportList, flushExportList, removeSeriesFromExportList } = exportSlice.actions;
export default exportSlice.reducer;
