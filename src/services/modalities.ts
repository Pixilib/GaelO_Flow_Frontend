import axios from "axios";

interface Modality {
    name: string;
    aet: string;
    host: string;
    port: number;
    manufacturer: string;
}

function handleAxiosError(error: any) {
    if (error.response) {
        throw error.response;
    }
    throw error;
}

export const updateModality = (
    modality: Modality
): Promise<Modality> => {
    const { name, aet, host, port, manufacturer } = modality;
    const payload = { aet, host, port, manufacturer };
    return axios.post(`/api/modalities/${name}`, payload)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const deleteModality = (name: string): Promise<string> => {
    return axios.delete(`/api/modalities/${name}`)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const getModalities = (): Promise<Modality[]> => {
    return axios.get("/api/modalities?expand")
        .then(response => response.data)
        .catch(handleAxiosError);
};