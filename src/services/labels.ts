import axios from "axios";

export const getLabels = ():Promise<string[]> => {
    return axios
        .get("/api/labels")
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}

export const postLabels = (label: string): Promise<void> => {
    return axios.post("/api/labels", { label })
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}

export const deleteLabels = (label: string): Promise<void> => {
    return axios.delete(`/api/labels/${label}`)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}