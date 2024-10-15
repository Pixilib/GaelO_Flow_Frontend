import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AnonPatient, AnonStudy } from "../utils/types";

export type AnonymizeState = {
  patients: {
    [patientId: string]: AnonPatient;
  };
  studies: {
    [studyId: string]: AnonStudy;
  };
  anonymizationProfile: "default" | "full";
};

type setAnonymizationProfilePayload = {
  anonymizationProfile: "default" | "full";
};

type AddAnonymizePayload = {
  patient: AnonPatient;
  study: AnonStudy;
};

type UpdateAnonymizationPatientPayload = {
  patientId: string;
  newPatientName?: string;
  newPatientId?: string;
};

type UdpateAnonymizeStudyPayload = {
  studyId: string;
  newStudyDescription?: string;
  newAccessionNumber?: string;
};

type RemoveAnonymizePayload = {
  studyId: string;
};

const initialState: AnonymizeState = {
  patients: {},
  studies: {},
  anonymizationProfile: "default",
};

const anonymizeSlice = createSlice({
  name: "anonymize",
  initialState,
  reducers: {
    updateAnonymizationProfile: (
      state,
      action: PayloadAction<setAnonymizationProfilePayload>
    ) => {
      state.anonymizationProfile = action.payload.anonymizationProfile;
    },
    addStudyToAnonymizeList: (
      state,
      action: PayloadAction<AddAnonymizePayload>
    ) => {
      const study = action.payload.study;
      const patientId = action.payload.patient.originalPatient.id;
      state.studies[study.originalStudy.id] = study;
      state.patients[patientId] = action.payload.patient;
    },
    updateAnonymizePatientValue: (
      state,
      action: PayloadAction<UpdateAnonymizationPatientPayload>
    ) => {

      const patientId = action.payload.patientId;

      const studyIdsToUpdate = Object.values(state.studies)
        .filter((study) => study.originalStudy.parentPatient === patientId)
        .map((study) => study.originalStudy.id);

      for (const studyId of studyIdsToUpdate) {
        if (action.payload.newPatientName) {
          state.studies[studyId].newPatientName = action.payload.newPatientName;
          state[patientId].newPatientName = action.payload.newPatientName;
        }

        if (action.payload.newPatientId) {
          state.studies[studyId].newPatientId = action.payload.newPatientId;
          state[patientId].newPatientId = action.payload.newPatientId;
        }
      }

    },
    updateAnonymizeStudyValue: (
      state,
      action: PayloadAction<UdpateAnonymizeStudyPayload>
    ) => {
      const studyId = action.payload.studyId;
      if (action.payload.newStudyDescription)
        state.studies[studyId].newStudyDescription =
          action.payload.newStudyDescription;
      if (action.payload.newAccessionNumber)
        state.studies[studyId].newAccessionNumber =
          action.payload.newAccessionNumber;
    },
    flushAnonymizeList: (state) => {
      state.patients = {};
      state.studies = {};
    },
    removeStudyFromAnonymizeList: (
      state,
      action: PayloadAction<RemoveAnonymizePayload>
    ) => {
      const studyId = action.payload.studyId;
      const patientId = state.studies[studyId].originalStudy.parentPatient;
      delete state.studies?.[studyId];
      const isRemainingStudiesOfPatient =
        Object.values(state.studies).filter(
          (study) => study.originalStudy.parentPatient === patientId
        ).length > 0;
      if (!isRemainingStudiesOfPatient) {
        delete state.patients?.[patientId];
      }
    },
  },
});

export const {
  updateAnonymizationProfile,
  addStudyToAnonymizeList,
  removeStudyFromAnonymizeList,
  flushAnonymizeList,
  updateAnonymizePatientValue,
  updateAnonymizeStudyValue,
} = anonymizeSlice.actions;

export default anonymizeSlice.reducer;
