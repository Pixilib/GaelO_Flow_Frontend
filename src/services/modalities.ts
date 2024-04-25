import axios from "axios";

interface Modality {
    Name: string;
    AET: string;
    Host: string;
    Port: number;
    Manufacturer: string;
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
    return axios.put(`/api/modalities/${modality.Name}`, modality)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const deleteModality = (name: string): Promise<string> => {
    return axios.delete(`/api/modalities/${name}`)
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const getModalities = (): Promise<Record<string, Modality>> => {
    return axios.get("/api/modalities?expand")
        .then(response => response.data)
        .catch(handleAxiosError);
};

export const echoModality = (name :string): Promise<void> => {
    return axios.post("/api/modalities/" + name + "/echo")
        .then(() => undefined)
        .catch(handleAxiosError);
};