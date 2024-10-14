import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AnonStudy, Patient } from '../utils/types';

export interface AnonymizeState {
    patients: {
        [patientId: string]: Patient
    }
    studies: {
        [studyId: string]: AnonStudy
    }
}

type AddAnonymizePayload = {
    patient: Patient
    study: AnonStudy
}

type UdpateAnonymizePayload = {
    studyId: string,
    newPatientName?: string,
    newPatientId?: string,
    newStudyDescription?: string,
    newAccessionNumber?: string

}

type RemoveAnonymizePayload = {
    studyId: string
}

const initialState: AnonymizeState = {
    patients: {},
    studies: {},
}

const anonymizeSlice = createSlice({
    name: 'anonymize',
    initialState,
    reducers: {
        addStudyToAnonymizeList: (state, action: PayloadAction<AddAnonymizePayload>) => {
            const study = action.payload.study;
            const patientId = action.payload.patient.id
            state.studies[study.originalStudy.id] = study
            state.patients[patientId] = action.payload.patient
        },
        updateAnonymizeValue: (state, action: PayloadAction<UdpateAnonymizePayload>) => {
            const studyId = action.payload.studyId;
            if(action.payload.newPatientName) state.studies[studyId].newPatientName = action.payload.newPatientName
            if(action.payload.newPatientId) state.studies[studyId].newPatientId = action.payload.newPatientId
            if(action.payload.newStudyDescription)state.studies[studyId].newStudyDescription = action.payload.newStudyDescription
            if(action.payload.newAccessionNumber) state.studies[studyId].newAccessionNumber = action.payload.newAccessionNumber
        },
        flushAnonymizeList: (state) => {
            state.patients = {}
            state.studies = {}
        },
        removeStudyFromAnonymizeList: (state, action: PayloadAction<RemoveAnonymizePayload>) => {
            const studyId = action.payload.studyId;
            const patientId = state.studies[studyId].originalStudy.parentPatient
            delete state.studies?.[studyId]
            const isRemainingStudiesOfPatient = Object.values(state.studies).filter(study => study.originalStudy.parentPatient === patientId).length > 0
            if (!isRemainingStudiesOfPatient){
                delete state.patients?.[patientId]
            }
        }
    }
})
export const { addStudyToAnonymizeList, removeStudyFromAnonymizeList, flushAnonymizeList, updateAnonymizeValue } = anonymizeSlice.actions;
export default anonymizeSlice.reducer;
