import { Label } from '../utils/types';
import axios from './axios';

export const getLabels = (): Promise<string[]> => {
    return axios
        .get(`/api/labels`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const addLabel = (payload: Label): Promise<void> => { 
    return axios
        .post(`/api/labels`, payload)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
            throw new Error(`Error: ${error.message}`);
        });
};

export const getRolesByLabelName = (labelName: string): Promise<string[]> => { 
    return axios
        .get(`/api/labels/${labelName}/roles`) 
        .then(response => {
            return response.data})
        .catch(error => {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
            throw new Error(`Error: ${error.message}`);
        });
};

export const removeLabel = (labelName: string): Promise<void> => {
    return axios
        .delete(`/api/labels/${labelName}`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
            throw new Error(`Error: ${error.message}`);
        });
};