import axios from "axios"
import { QueryResponse, QueryPayload } from "../utils/types";

export const postQueryParsed = (id:string, payload: QueryPayload): Promise<QueryResponse[]> => {
    return axios
        .post(`/api/modalities/${id}/parsed-query`, payload)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const getQueriesAnswers = (id: string): Promise<any[]> => {
    return axios
        .get(`/api/queries/${id}/answers`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}