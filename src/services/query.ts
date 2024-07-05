import axios from "axios"
import { QueryResponse, QueryPayload } from "../utils/types";

export const queryModality = (modality: string, payload: QueryPayload): Promise<QueryResponse[]> => { // Notez le changement ici
    return axios
        .post(`/api/modalities/${modality}/parsed-query`, payload)
        .then((response: any) => {
            return response.data.map((data: any) => ({
                answerId: data.AnswerId,
                answerNumber: data.AnswerNumber,
                level: data.Level,
                originAET: data.OriginAET,
                patientName: data.PatientName,
                patientID: data.PatientID,
                accessionNumber: data.AccessionNumber,
                studyDescription: data.StudyDescription,
                studyDate: data.StudyDate,
                requestedProcedureDescription: data.RequestedProcedureDescription,
                modality: data.Modality,
                seriesDescription: data.SeriesDescription,
                seriesNumber: data.SeriesNumber,
                numberOfSeriesRelatedInstances: data.NumberOfSeriesRelatedInstances,
                studyInstanceUID: data.StudyInstanceUID,
                seriesInstanceUID: data.SeriesInstanceUID
            }));
        })
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};


export const makeRetrieve = (AnswerId: string, AnswerNumber: number): Promise<any> => {
    const payload = {
        Asynchronous: true
    }
    return axios
        .post(`/api/queries/${AnswerId}/answers/${AnswerNumber.toString()}/retrieve`, payload)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}
