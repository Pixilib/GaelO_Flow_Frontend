import axios from "axios";

export const updateModality = (name: string, aet: string, host: string, port: number, manufacturer: string): Promise<unknown> => {
    const payload = {
        AET: aet,
        Host: host,
        Port: port,
        Manufacturer: manufacturer
    }

    return axios.post("/api/modalities/" + name, payload).then(response => response.data)
        .catch(function (error) {
            if (error.response) {
                throw error.response;
            }
            throw error;
        });
};

export const deleteModality = (name: string): Promise<unknown> => {
    return axios.delete("/api/modalities/" + name)
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

export const getModalities = (): Promise<unknown> => {
    return axios.get("/api/modalities?expand")
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
