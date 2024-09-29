import axios from "axios";
import { Queue } from "../utils/types";

export const createDeleteQueue = (seriesId: string[]): Promise<string> => {
    const payload = {
        OrthancSeriesIds: seriesId
    }
    return axios
        .post(`/api/queues/delete`, payload)
        .then((response) => response.data.Uuid)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const getDeleteQueue = (uuid: string): Promise<Queue> => {

    return axios
        .get(`/api/queues/delete/${uuid}`)
        .then((response) => {
            const data: any = Object.values(response.data)[0];
            return {
                userId: data.UserId,
                progress: data.Progress,
                state: data.State,
                id: data.Id,
                results: data.Results
            }
        })
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const deleteDeleteQueue = (uuid: string): Promise<void> => {

    return axios
        .delete(`/api/queues/delete/${uuid}`)
        .then(() => undefined)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};


export const getExistingDeleteQueues = (userId: number | undefined): Promise<string[]> => {
    const url = userId ? `/api/queues/delete?userId=${userId}` : '/api/queues/delete'
    return axios
        .get(url)
        .then((response) => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};