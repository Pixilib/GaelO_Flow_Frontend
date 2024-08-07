import axios from "axios";
import { QueryResponse, QueryPayload, RetrieveResponse } from "../utils/types";

export const queryModality = (
  modality: string,
  payload: QueryPayload
): Promise<QueryResponse[]> => {
  return axios
    .post(`/api/modalities/${modality}/parsed-query`, payload)
    .then((response: any):QueryResponse[] => {
      return response.data.map(
        (data: any): QueryResponse => ({
          answerId: data.AnswerId,
          answerNumber: data.AnswerNumber,
          level: data.Level,
          originAET: data.OriginAET,
          patientName: data.PatientName,
          patientId: data.PatientID,
          accessionNumber: data.AccessionNumber,
          studyDescription: data.StudyDescription,
          studyDate: data.StudyDate,
          requestedProcedureDescription: data.RequestedProcedureDescription,
          modality: data.Modality,
          seriesDescription: data.SeriesDescription,
          seriesNumber: data.SeriesNumber,
          numberOfSeriesRelatedInstances: data.NumberOfSeriesRelatedInstances,
          studyInstanceUID: data.StudyInstanceUID,
          seriesInstanceUID: data.SeriesInstanceUID,
        })
      );
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};

export const makeRetrieve = (
  answerId: string,
  answerNumber: number
): Promise<RetrieveResponse> => {
  const payload = {
    Asynchronous: true,
  };
  return axios
    .post(`/api/queries/${answerId}/answers/${answerNumber}/retrieve`, payload)
    .then((response: any) => {
      const data = response.data;
      return {
        id: data.ID,
        path: data.Path,
      };
    })
    .catch((error) => {
      if (error.response) {
        throw error.response;
      }
      throw error;
    });
};
