import axios from "axios"
import { QueryResponse, QueryPayload } from "../utils/types";

export const queryModality = (modality: string, payload: QueryPayload): Promise<QueryResponse[]> => {
    return axios
        .post(`/api/modalities/${modality}/parsed-query`, payload)
        .then(response => response.data)
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
