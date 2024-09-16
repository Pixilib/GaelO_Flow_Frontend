import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Study } from '../utils/types';

export interface DeleteState {
    studies: {
        [studyId: string]: {
            study: Study,
        }
    }
}

type DeletePayload = {
    study : Study
}

type RemovePayload = {
    studyId: string
}

const initialState: DeleteState = {
    studies: {},
}

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        addSeriesToDeleteList: (state, action: PayloadAction<DeletePayload>) => {
            const study = action.payload.study;

            state.studies[study.id] = {
                study: study,
            }

        },
        removeStudyFromDeleteList: (state, action: PayloadAction<RemovePayload>) => {
            const studyId = action.payload.studyId;
            delete state.studies?.[studyId]
        }
    }
})
export const { addSeriesToDeleteList, removeStudyFromDeleteList } = deleteSlice.actions;
export default deleteSlice.reducer;
