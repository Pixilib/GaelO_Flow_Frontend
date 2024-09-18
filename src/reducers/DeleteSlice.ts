import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Study } from '../utils/types';

export interface DeleteState {
    studies: {
        [studyId: string]: {
            study: Study,
        }
    }
}

type AddDeletePayload = {
    study : Study
}

type RemoveDeletePayload = {
    studyId: string
}

const initialState: DeleteState = {
    studies: {},
}

const deleteSlice = createSlice({
    name: 'delete',
    initialState,
    reducers: {
        addStudyToDeleteList: (state, action: PayloadAction<AddDeletePayload>) => {
            const study = action.payload.study;

            state.studies[study.id] = {
                study: study,
            }

        },
        flushDeleteList : (state) =>{
            state.studies = {}
        },
        removeStudyFromDeleteList: (state, action: PayloadAction<RemoveDeletePayload>) => {
            const studyId = action.payload.studyId;
            delete state.studies?.[studyId]
        }
    }
})
export const { addStudyToDeleteList, removeStudyFromDeleteList, flushDeleteList } = deleteSlice.actions;
export default deleteSlice.reducer;
