import axios from './axios';

export const getRoles = (): Promise<Roles[]> => {
    return axios
        .get(`/api/roles`)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const addRoles = (payload: roles): Promise<void> => {
    return axios
        .post(`/api/roles`, payload)
        .then(response => response.data)
        .catch(error => {
            if (error.response) {
                throw new Error(`Error: ${error.response.status} - ${error.response.data.message}`);
            }
            throw new Error(`Error: ${error.message}`);
        });
};