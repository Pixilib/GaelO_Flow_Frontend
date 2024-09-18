import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnonStudy } from '../utils/types';

export interface AnonymizeState {
    studies: {
        [studyId: string]: {
            study: AnonStudy,
        }
    }
}

type AddAnonymizePayload = {
    study : AnonStudy
}

type UdpateAnonymizePayload = {
    studyId: string,
    newPatientName : string,
    newPatientId : string,
    newStudyDescription : string,
    newAccessionNumber : string

}

type RemoveAnonymizePayload = {
    studyId: string
}

const initialState: AnonymizeState = {
    studies: {},
}

const anonymizeSlice = createSlice({
    name: 'anonymize',
    initialState,
    reducers: {
        addStudyToAnonymizeList: (state, action: PayloadAction<AddAnonymizePayload>) => {
            const study = action.payload.study;
            state.studies[study.originalStudy.id] = {
                study: study,
            }
        },
        updateAnonymizeValue : (state, action: PayloadAction<UdpateAnonymizePayload>) => {
            const studyId = action.payload.studyId;
            state.studies[studyId].study.newPatientName = action.payload.newPatientName
            state.studies[studyId].study.newPatientId = action.payload.newPatientId
            state.studies[studyId].study.newStudyDescription = action.payload.newStudyDescription
            state.studies[studyId].study.newAccessionNumber = action.payload.newAccessionNumber

        },
        flushAnonymizeList: (state) => {
            state.studies = {}
        },
        removeStudyFromAnonymizeList: (state, action: PayloadAction<RemoveAnonymizePayload>) => {
            const studyId = action.payload.studyId;
            delete state.studies?.[studyId]
        }
    }
})
export const { addStudyToAnonymizeList, removeStudyFromAnonymizeList, flushAnonymizeList } = anonymizeSlice.actions;
export default anonymizeSlice.reducer;
