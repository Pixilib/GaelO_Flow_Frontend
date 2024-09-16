import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Series, SeriesMainDicomTags, Study, StudyMainDicomTags } from '../utils/types';

export interface DeleteState {
    series: {
        [seriesId: string]: {
            studyId: string,
            seriesId: string,
            studyMainDicomTags: StudyMainDicomTags,
            seriesMainDicomTags: SeriesMainDicomTags
        }
    }
}

type DeletePayload = {
    study: Study,
    series: Series
}

type RemovePayload = {
    seriesId: string
}

const initialState: DeleteState = {
    series: {},
}

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        addSeriesToDeleteList: (state, action: PayloadAction<DeletePayload>) => {
            const study = action.payload.study;
            const series = action.payload.series;

            state.series[series.id] = {
                studyId: study.id,
                seriesId: series.id,
                studyMainDicomTags: study.mainDicomTags,
                seriesMainDicomTags: series.mainDicomTags
            }

        },
        removeSeriesFromDeleteList: (state, action: PayloadAction<RemovePayload>) => {
            const seriesId = action.payload.seriesId;
            delete state.series?.[seriesId]
        }
    }
})
export const { addSeriesToDeleteList, removeSeriesFromDeleteList } = deleteSlice.actions;
export default deleteSlice.reducer;
