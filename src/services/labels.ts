
import axios from './axios';

interface LabelResponse {
    labels: string[];
}

export const getLabels = (id: string): Promise<LabelResponse> => {
    return axios
        .get(`/api/instances/${id}/labels`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const addLabel = (id: string, label: string): Promise<void> => {
    return axios
        .put(`/api/instances/${id}/labels/${label}`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const removeLabel = (id: string, label: string): Promise<void> => {
    return axios
        .delete(`/api/instances/${id}/labels/${label}`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const testLabel = (id: string, label: string): Promise<boolean> => {
    return axios
        .get(`/api/instances/${id}/labels/${label}`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};
