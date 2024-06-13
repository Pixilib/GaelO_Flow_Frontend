import axios from "axios"

export const postQuery = (id:number): Promise<void> => {
    return axios.post(`/api/jobs/${id}/parsed-query`)
        .then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
}



