import axios from './axios';

interface LabelResponse {
    labels: string[];
}

export const getLabels = (): Promise<LabelResponse> => {
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

export const addLabel = (label: string): Promise<void> => { 
    return axios
        .post(`/api/labels`, { label }) 
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
            throw new Error(`Error: ${error.message}`);
        });
};

export const getRolesByLabelName = (labelName: string): Promise<void> => { 
    return axios
        .get(`/api/labels/${labelName}/roles`) 
        .then(response => response.data)
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