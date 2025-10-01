import axios from "./axios";


export const getCdBurnerItems = async (): Promise<any[]> => {
    return axios
        .get("/api/cd-burner")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const cancelCdBurnerJob = async (jobID: string): Promise<void> => {
    return axios
        .post(`/api/cd-burner/${jobID}/cancel`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};
